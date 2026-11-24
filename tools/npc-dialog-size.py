#!/usr/bin/env python3
"""NPC dialog size: how big is the dialog JSON an NPC sends, in every state?

BehaviourDatabase::sendDialog sends the dialog as one JSON text on extended
opcode 103. One string in a message holds at most 8192 bytes
(NetworkMessage::MAX_STRING_LENGTH); ProtocolGame::sendExtendedOpcode sends a
longer text in parts of EXTENDED_OPCODE_PART_LENGTH bytes that the client
joins. This script estimates, for every NPC and every conversation state
tools/npc-dialog-check.py walks, an upper bound of that JSON's size, and how
many messages it takes.

The estimate counts everything a player could get: every listed offer, the
keywords of both the "asks something" and the plain line, the NPC's longest
line with %N (a 30-letter name), %P, %A, %D (10 digits) and %S (30 letters),
10-digit money, ids and prices that are not constant. Lines from Lua scripts are not counted. "Before #89"
is a rough estimate of the earlier dialog: only offers whose rule is made of
words alone, no amountWords, and at most 12 keywords plus job, name, offer
and trade.

It fails (exit status 1) if the part length in src/protocolgame.cpp could
make a part longer than one string holds, or if an NPC cannot be read.

Usage: tools/npc-dialog-size.py [--all] [--top N] [data/npc]
"""

import importlib.util
import os
import re
import sys

sys.dont_write_bytecode = True  # no __pycache__ for the imported checker
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

_spec = importlib.util.spec_from_file_location('npc_dialog_check', os.path.join(ROOT, 'tools', 'npc-dialog-check.py'))
check = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(check)


def constant(path, pattern):
    with open(os.path.join(ROOT, path), encoding='latin-1') as f:
        found = re.search(pattern, f.read())
    if not found:
        sys.exit('%s: cannot find %s' % (path, pattern))
    return int(found.group(1))


MAX_STRING = constant('src/networkmessage.h', r'MAX_STRING_LENGTH\s*=\s*(\d+)')
PART = constant('src/protocolgame.cpp', r'EXTENDED_OPCODE_PART_LENGTH\s*=\s*(\d+)')

NUMBER = 10  # digits of an id, money or a computed price
PLACEHOLDERS = {'%N': 'x' * 30, '%S': 'x' * 30, '%P': '9' * NUMBER, '%A': '9' * NUMBER, '%D': '9' * NUMBER,
                '%T': '12:00 am'}


def json_length(text):
    """The length of jsonString(text) in src/behaviourdatabase.cpp (Latin-1
    to UTF-8, escapes)."""
    n = 2
    for c in text.encode('latin-1', 'replace'):
        if c in (0x22, 0x5c, 0x0a):
            n += 2
        elif c < 0x20 and c != 0x09:
            continue
        else:
            n += 2 if c >= 0x80 else 1
    return n


def load_items():
    """TypeID -> (name, weight, cumulative) from data/items792/items.srv"""
    items, current = {}, None
    with open(os.path.join(ROOT, 'data', 'items792', 'items.srv'), encoding='latin-1') as f:
        for line in f:
            m = re.match(r'\s*TypeID\s*=\s*(\d+)', line)
            if m:
                current = int(m.group(1))
                items[current] = ['', 0, False]
                continue
            if current is None:
                continue
            m = re.match(r'\s*Name\s*=\s*"(.*)"', line)
            if m:
                name = m.group(1)
                for article in ('a ', 'an '):
                    if name.startswith(article):
                        name = name[len(article):]
                items[current][0] = name
            m = re.search(r'Weight=(\d+)', line)
            if m and line.strip().startswith('Attributes'):
                items[current][1] = int(m.group(1))
            if line.strip().startswith('Flags') and 'Cumulative' in line:
                items[current][2] = True
    return items


def constant_value(node):
    """A number or arithmetic of numbers ("41*20"), else None"""
    if node and node[0] == 'number':
        return node[1]
    if node and node[0] == 'arith':
        a, b = constant_value(node[2]), constant_value(node[3])
        if a is not None and b is not None:
            return {'+': a + b, '-': a - b, '*': a * b}.get(node[1])
    return None


def price_digits(offer):
    for action in offer.rule.actions:
        if action[0] == 'price' and action[1]:
            value = constant_value(action[1][0])
            return len(str(value)) if value is not None else NUMBER
    return NUMBER


def offer_length(offer, items, with_amount_words=True):
    """MIRRORS behaviourdatabase.cpp sendDialog() (an offer's JSON)"""
    if offer.travel:
        return len('{"name":,"price":,"words":}') + json_length(offer.words) + price_digits(offer) + json_length(offer.words)
    name, weight, cumulative = items.get(offer.item, ('', 0, False))
    n = len('{"item":,"name":,"price":,"weight":,"stackable":,"words":,"amounts":}')
    n += 5 + json_length(name) + price_digits(offer) + len(str(weight)) + (4 if cumulative else 5)
    n += json_length(offer.words) + 5
    if with_amount_words and offer.amount_words:
        n += len(',"amountWords":') + json_length(offer.amount_words)
    return n


def longest_line(rules):
    longest = 0
    for rule in rules:
        parts = [a[1] for a in rule.actions if a[0] == 'string' and isinstance(a[1], str)]
        if not parts:
            continue
        text = ' '.join(parts)
        for key, value in PLACEHOLDERS.items():
            text = text.replace(key, value)
        longest = max(longest, json_length(text))
    return longest


def list_length(lengths):
    return sum(lengths) + max(len(lengths) - 1, 0)


def messages(size):
    """How many messages ProtocolGame::sendExtendedOpcode sends"""
    return 1 if size <= MAX_STRING else -(-size // PART)


def measure(path, items):
    name, rules = check.load_npc(path)
    dialog = check.Dialog(rules)
    listed = dialog.listed_offers()
    fixed = len('{"npc":,"id":,"text":,"money":,"question":false,"keywords":[],"buy":[],"sell":[],"travel":[]}')
    fixed += json_length(name) + NUMBER + longest_line(rules) + NUMBER
    offers = list_length([offer_length(o, items) for o in listed.values() if not o.travel and not o.sell]) + \
        list_length([offer_length(o, items) for o in listed.values() if o.sell]) + \
        list_length([offer_length(o, items) for o in listed.values() if o.travel])
    older = [o for o in listed.values() if all(c[0] == 'string' for c in o.rule.conditions)]
    offers_before = list_length([offer_length(o, items, False) for o in older if not o.travel and not o.sell]) + \
        list_length([offer_length(o, items, False) for o in older if o.sell]) + \
        list_length([offer_length(o, items, False) for o in older if o.travel])
    states = []
    for label, topic in check.states_of(rules):
        keywords = max((dialog.keywords(topic, listed, asks)[0] for asks in (True, False)),
                       key=lambda words: list_length([json_length(w) for w in words]))
        lengths = sorted((json_length(w) for w in keywords), reverse=True)
        after = fixed + list_length(lengths) + offers
        before = fixed + list_length(lengths[:16]) + offers_before
        states.append((after, before, label))
    return name, os.path.basename(path), states, len(listed)


def main(argv):
    show_all = '--all' in argv
    args = [a for a in argv if a != '--all']
    top = 15
    if '--top' in args:
        k = args.index('--top')
        top = int(args[k + 1])
        del args[k:k + 2]
    directory = args[0] if args else os.path.join(ROOT, 'data', 'npc')
    failed = False
    if PART + 1 > MAX_STRING:
        print('FAIL: a part of %d bytes and its marker do not fit in a string of %d bytes' % (PART, MAX_STRING))
        failed = True
    items = load_items()
    results = []
    for f in sorted(f for f in os.listdir(directory) if f.endswith('.npc')):
        try:
            name, file, states, offers = measure(os.path.join(directory, f), items)
        except check.ScriptError as e:
            print('%s: cannot read: %s' % (f, e))
            failed = True
            continue
        if states:
            after, before, label = max(states)
            results.append((after, max(s[1] for s in states), name, file, label, offers, len(states),
                            sum(1 for s in states if s[0] > MAX_STRING)))
    results.sort(reverse=True)
    print('Largest NPC dialogs (bytes of JSON, upper bound; a string holds %d, longer goes in parts of %d):'
          % (MAX_STRING, PART))
    print('  %-28s %8s %8s %6s %5s  %s' % ('NPC', 'now', 'before', 'parts', 'offers', 'largest state'))
    for after, before, name, file, label, offers, _, _ in (results if show_all else results[:top]):
        print('  %-28s %8d %8d %6d %5d  %s' % (name, after, before, messages(after), offers, label))
    over_now = [r for r in results if r[0] > MAX_STRING]
    over_before = [r for r in results if r[1] > MAX_STRING]
    print('%d NPCs; over %d bytes in some state: %d now (%d states), %d before #89 (estimate). '
          'Largest: %d bytes in %d messages. Every part is at most %d bytes.'
          % (len(results), MAX_STRING, len(over_now), sum(r[7] for r in results), len(over_before),
             results[0][0] if results else 0, messages(results[0][0]) if results else 0, PART + 1))
    return 1 if failed or not results else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
