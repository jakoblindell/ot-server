#!/usr/bin/env python3
"""NPC dialog check: does the tap-to-talk dialog offer every word an NPC takes?

Reads every NPC in data/npc the way the server's ScriptReader and
BehaviourDatabase::loadBehaviour do (includes, "*", rule priority), walks the
conversation states the engine has (the greeting, the top level, every topic
a rule can set) and, in each state, lists every word a rule takes there. Then
it works out the buttons BehaviourDatabase::sendDialog would send in that
state and reports each word without one.

Conditions that depend on the player (premium, level, quest values, vocation,
items, money, exchange values) count as "could be true", so every variant of
a rule needs its button. Topic conditions are evaluated for the state.

The dialog rules below mirror src/behaviourdatabase.cpp (analyseDialogRules,
tradeOf, offerAmountWords, sendDialog); a change to one is made in both. Look
for "MIRRORS behaviourdatabase.cpp" in this file and "MIRRORED IN
tools/npc-dialog-check.py" in the C++.

Amount rules ("%1,1<%1,"torch"") cannot be buttons: they need a number. One
that trades an item counts when the shop's amount for an offer says its words
(or makes the same trade); one that needs a typed number or name besides its
words ("transfer 100 to Name") is listed, not failed. States where the NPC
waits for a number and takes no words (the bank's "how much?") have no words
to check.

Usage: tools/npc-dialog-check.py [--verbose] [--npc NAME] [data/npc]
Exit status 1 when a word has no button.
"""

import os
import re
import sys

# ---------------------------------------------------------------------------
# Reading the scripts (src/script.cpp, src/behaviourdatabase.cpp: load*)


class ScriptError(Exception):
    pass


def tokenize(path, out, depth=0):
    """Tokens of a script file, with @"file" includes read in place.
    Each token: (kind, value, file, line)."""
    if depth > 8:
        raise ScriptError('includes nested too deep: ' + path)
    with open(path, 'rb') as f:
        text = f.read().decode('latin-1')
    directory = os.path.dirname(path)
    name = os.path.basename(path)
    i, line, n = 0, 1, len(text)
    while i < n:
        c = text[i]
        if c == '\n':
            line += 1
            i += 1
        elif c.isspace():
            i += 1
        elif c == '#':
            while i < n and text[i] != '\n':
                i += 1
        elif c == '@':
            m = re.match(r'@"([^"]*)"', text[i:])
            if not m:
                raise ScriptError('%s:%d: bad include' % (name, line))
            tokenize(os.path.join(directory, m.group(1)), out, depth + 1)
            i += m.end()
        elif c.isalpha():
            m = re.match(r'[A-Za-z][A-Za-z0-9_]*', text[i:])
            out.append(('ident', m.group(0).lower(), name, line))
            i += m.end()
        elif c.isdigit():
            m = re.match(r'[0-9]+', text[i:])
            out.append(('number', int(m.group(0)), name, line))
            i += m.end()
        elif c == '"':
            j, s = i + 1, ''
            while j < n and text[j] != '"':
                if text[j] == '\\' and j + 1 < n:
                    j += 1
                    s += '\n' if text[j] == 'n' else text[j]
                else:
                    if text[j] == '\n':
                        line += 1
                    s += text[j]
                j += 1
            out.append(('string', s, name, line))
            i = j + 1
        elif c == '[':
            m = re.match(r'\[\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+\s*\]', text[i:])
            if m:
                out.append(('coordinate', m.group(0), name, line))
                i += m.end()
            else:
                out.append(('special', '[', name, line))
                i += 1
        elif c == '<':
            nxt = text[i + 1:i + 2]
            if nxt == '=':
                out.append(('special', '<=', name, line))
                i += 2
            elif nxt == '>':
                out.append(('special', '<>', name, line))
                i += 2
            else:
                out.append(('special', '<', name, line))
                i += 1
        elif c == '>':
            if text[i + 1:i + 2] == '=':
                out.append(('special', '>=', name, line))
                i += 2
            else:
                out.append(('special', '>', name, line))
                i += 1
        elif c == '-':
            if text[i + 1:i + 2] == '>':
                out.append(('special', '->', name, line))
                i += 2
            else:
                out.append(('special', '-', name, line))
                i += 1
        elif c in '%$':
            # %1 / $1: the number in the message (ScriptReader::readNumber)
            m = re.match(r'[%$]\s*([0-9]+)', text[i:])
            if not m:
                raise ScriptError('%s:%d: number expected after %s' % (name, line, c))
            out.append(('pct' if c == '%' else 'dol', int(m.group(1)), name, line))
            i += m.end()
        else:
            out.append(('special', c, name, line))
            i += 1
    return out


# Condition identifiers (loadConditions)
CONDITION_WORDS = {'sorcerer', 'knight', 'paladin', 'druid', 'premium', 'realpremium', 'pvpenforced',
                   'female', 'male', 'pzblock', 'pzfree', 'promoted'}
SITUATIONS = {'address', 'busy', 'vanish'}


class Rule:
    def __init__(self, file, line):
        self.file = file
        self.line = line
        self.situation = 'none'
        self.conditions = []  # ('string', s) ('nop',) ('count', n) ('countnolimit', n) ('flag', name) ('op', op, left, right)
        self.actions = []  # ('string', s) or (name, [exprs])
        self.priority = 0

    @property
    def strings(self):
        return [c[1] for c in self.conditions if c[0] == 'string']

    @property
    def words(self):
        # MIRRORS behaviourdatabase.cpp ruleWords(): the string conditions,
        # without the "$" of whole words, joined by spaces
        return ' '.join(s[:-1] if s.endswith('$') else s for s in self.strings)

    def where(self):
        return '%s:%d' % (self.file, self.line)


class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.i = 0

    def peek(self, offset=0):
        j = self.i + offset
        return self.tokens[j] if j < len(self.tokens) else ('eof', None, '?', 0)

    def take(self):
        t = self.peek()
        self.i += 1
        return t

    def error(self, message):
        t = self.peek()
        raise ScriptError('%s:%d: %s (at %r)' % (t[2], t[3], message, t[1]))

    def expect(self, value):
        t = self.take()
        if t[0] != 'special' or t[1] != value:
            self.i -= 1
            self.error("'%s' expected" % value)

    def is_special(self, value, offset=0):
        t = self.peek(offset)
        return t[0] == 'special' and t[1] == value

    # readValue
    def value(self):
        t = self.take()
        if t[0] == 'number':
            return ('number', t[1])
        if t[0] == 'string':
            return ('text', t[1].lower())
        if t[0] == 'pct':
            return ('%', t[1])
        if t[0] == 'dol':
            return ('$', t[1])
        if t[0] != 'ident':
            self.i -= 1
            self.error('value expected')
        name = t[1]
        args = []
        if self.is_special('('):
            self.take()
            args.append(self.factor())
            while self.is_special(','):
                self.take()
                args.append(self.factor())
            self.expect(')')
        return (name, args)

    # readFactor: * and / and + -, left to right
    def factor(self):
        node = self.value()
        while self.peek()[0] == 'special' and self.peek()[1] in ('*', '/', '+', '-'):
            op = self.take()[1]
            node = ('arith', op, node, self.value())
        return node

    def conditions(self, rule):
        bang = False
        while True:
            t = self.peek()
            if t[0] == 'ident' and t[1] in SITUATIONS:
                rule.situation = t[1]
                self.take()
            elif t[0] == 'ident' and t[1] in CONDITION_WORDS:
                rule.conditions.append(('flag', t[1]))
                self.take()
            elif t[0] == 'string':
                rule.conditions.append(('string', t[1].lower()))
                rule.priority += len(t[1])
                self.take()
            elif t[0] == 'special' and t[1] == '!':
                rule.conditions.append(('nop',))
                bang = True
                self.take()
            elif t[0] == 'pct':
                rule.conditions.append(('count', t[1]))
                self.take()
            elif t[0] == 'dol':
                rule.conditions.append(('countnolimit', t[1]))
                self.take()
            elif t[0] == 'special' and t[1] == ',':
                self.take()
                continue
            elif t[0] == 'special':
                break
            else:
                left = self.factor()
                op = self.take()
                if op[0] != 'special' or op[1] not in ('<', '=', '>', '>=', '<>', '<='):
                    self.i -= 1
                    self.error('relational operator expected')
                right = self.factor()
                rule.conditions.append(('op', op[1], left, right))
        return bang

    def actions(self, rule, previous):
        while True:
            t = self.take()
            if t[0] == 'string':
                rule.actions.append(('string', t[1]))
            elif t[0] == 'ident':
                name = t[1]
                args = []
                if self.is_special('='):
                    self.take()
                    args.append(self.factor())
                elif self.is_special('('):
                    self.take()
                    args.append(self.factor())
                    while self.is_special(','):
                        self.take()
                        args.append(self.factor())
                    self.expect(')')
                rule.actions.append((name, args))
            elif t[0] == 'special' and t[1] == '*':
                if previous is None:
                    self.i -= 1
                    self.error('no previous pattern')
                rule.actions.extend(previous.actions)
                return
            else:
                self.i -= 1
                self.error('illegal action term')
            if self.is_special(','):
                self.take()
                continue
            return


def load_npc(path):
    tokens = tokenize(path, [])
    p = Parser(tokens)
    name = os.path.splitext(os.path.basename(path))[0]
    # the header: Name = "...", ..., Behaviour = { ... }
    while p.peek()[0] != 'eof':
        t = p.take()
        if t[0] == 'ident' and t[1] == 'name' and p.is_special('=') and p.peek(1)[0] == 'string':
            name = p.peek(1)[1]
        if t[0] == 'ident' and t[1] == 'behaviour' and p.is_special('='):
            p.take()
            p.expect('{')
            break
    else:
        return name, []
    entries = []
    previous = None
    while p.peek()[0] != 'eof' and not p.is_special('}'):
        first = p.peek()
        rule = Rule(first[2], first[3])
        bang = p.conditions(rule)
        p.expect('->')
        p.actions(rule, previous)
        rule.priority += len(rule.conditions)
        if bang:
            rule.priority += rule.priority + 1
        # std::lower_bound with "priority >=": after every rule of the same
        # or a higher priority
        at = len(entries)
        for k, other in enumerate(entries):
            if other.priority < rule.priority:
                at = k
                break
        entries.insert(at, rule)
        previous = rule
    return name, entries


# ---------------------------------------------------------------------------
# Conditions in a state

def uses(node, names):
    if node is None or not isinstance(node, tuple):
        return False
    if node[0] in names:
        return True
    if node[0] == 'arith':
        return uses(node[2], names) or uses(node[3], names)
    if node[0] == 'op':
        return uses(node[2], names) or uses(node[3], names)
    if len(node) > 1 and isinstance(node[1], list):
        return any(uses(a, names) for a in node[1])
    return False


def number(node):
    return node[1] if node and node[0] == 'number' else None


def topic_condition(condition):
    """(op, n) for Topic <op> n; True when the condition mentions the topic in
    another way; None when it does not use the topic."""
    if condition[0] != 'op' or not (uses(condition[2], {'topic'}) or uses(condition[3], {'topic'})):
        return None
    if condition[2] == ('topic', []) and number(condition[3]) is not None:
        return (condition[1], number(condition[3]))
    return True


def compare(op, a, b):
    return {'<': a < b, '=': a == b, '>': a > b, '>=': a >= b, '<>': a != b, '<=': a <= b}[op]


def can_hold(rule, topic):
    """The rule's conditions could all be true at this topic for some player."""
    for condition in rule.conditions:
        t = topic_condition(condition)
        if isinstance(t, tuple) and not compare(t[0], topic, t[1]):
            return False
    return True


def continues_topic(rule):
    # MIRRORS behaviourdatabase.cpp continuesTopic()
    return any(topic_condition(c) is not None for c in rule.conditions)


def takes_amount(rule):
    # MIRRORS behaviourdatabase.cpp takesAmount()
    return any(c[0] in ('count', 'countnolimit') or (c[0] == 'op' and (uses(c[2], {'%', '$'}) or uses(c[3], {'%', '$'})))
               for c in rule.conditions)


def sets_topic(rule):
    for action in rule.actions:
        if action[0] == 'topic' and action[1]:
            return number(action[1][0])
    return None


def is_money(condition):
    # dialogConditionsPass skips CountMoney checks
    return condition[0] == 'op' and (uses(condition[2], {'countmoney'}) or uses(condition[3], {'countmoney'}))


def search_digit(message, limit=True):
    # BehaviourDatabase::searchDigit / searchDigitNoLimit
    m = re.search(r'[0-9]+', message)
    if not m:
        return 0
    value = int(m.group(0))
    return min(value, 500) if limit else value


def search_word(pattern, message):
    # BehaviourDatabase::searchWord
    if not pattern or not message:
        return False
    whole = pattern.endswith('$')
    word = pattern[:-1] if whole else pattern
    lower = message.lower()
    at = lower.find(word)
    if at < 0:
        return False
    if whole:
        end = at + len(word)
        if end < len(lower) and not lower[end].isspace():
            return False
    return True


def value_of(node, message):
    """The node's value when it depends on the message alone, else None."""
    if node[0] == 'number':
        return node[1]
    if node[0] == '%':
        v = search_digit(message)
        return v if v >= node[1] else 0
    if node[0] == '$':
        v = search_digit(message, False)
        return v if v >= node[1] else 0
    if node[0] == 'arith':
        a, b = value_of(node[2], message), value_of(node[3], message)
        if a is None or b is None:
            return None
        if node[1] == '/':
            return int(a / b) if b else None
        return {'*': a * b, '+': a + b, '-': a - b}[node[1]]
    return None


def could_pass(rule, topic, message):
    """The rule's conditions could all hold for this message at this topic.
    MIRRORS behaviourdatabase.cpp dialogConditionsPass() (checkCondition; the
    player's state counts as could-be-true, money is skipped)."""
    for condition in rule.conditions:
        kind = condition[0]
        if kind == 'string':
            if not search_word(condition[1], message):
                return False
        elif kind in ('count', 'countnolimit'):
            if search_digit(message, kind == 'count') < condition[1]:
                return False
        elif kind == 'op':
            if is_money(condition):
                continue
            t = topic_condition(condition)
            if isinstance(t, tuple):
                if not compare(t[0], topic, t[1]):
                    return False
                continue
            if t is True:
                continue
            a, b = value_of(condition[2], message), value_of(condition[3], message)
            if a is not None and b is not None and not compare(condition[1], a, b):
                return False
    return True


# ---------------------------------------------------------------------------
# The dialog (src/behaviourdatabase.cpp: analyseDialogRules, tradeOf,
# offerAmountWords, sendDialog)

# MIRRORS behaviourdatabase.cpp byeOrGreeting(): Bye, and the greetings
BYE_WORDS = {'hello', 'hi', 'bye', 'farewell', 'good bye'}


def topic_number(condition):
    if condition[0] == 'op' and condition[1] == '=' and condition[2] == ('topic', []) and number(condition[3]) is not None:
        return number(condition[3])
    return None


def depends_on_player(rule):
    """Some condition besides words, amounts and the topic (premium, level,
    quest values, items, exchange values): it holds for some players only."""
    for condition in rule.conditions:
        if condition[0] == 'flag':
            return True
        if condition[0] == 'op' and topic_condition(condition) is None and \
                (value_of(condition[2], '2') is None or value_of(condition[3], '2') is None):
            return True
    return False


class Offer:
    def __init__(self, rule, words, item, sell, travel, bare=None):
        self.rule, self.words, self.item, self.sell, self.travel = rule, words, item, sell, travel
        self.bare = bare if bare is not None else (words[5:] if words.startswith('sell ') else words)
        self.amount_words = ''


class Trade:
    def __init__(self):
        self.item, self.sets_topic = 0, 0
        self.has_price = self.has_topic = self.teleports = self.sell = False


class Dialog:
    """An NPC's rules as the dialog sees them."""

    def __init__(self, rules):
        self.rules = rules
        self.none = [r for r in rules if r.situation == 'none']
        self.analyse()

    def yes_topic(self, rule):
        on_topic, yes = 0, False
        for condition in rule.conditions:
            if condition[0] == 'string' and condition[1] == 'yes':
                yes = True
            elif topic_number(condition) is not None:
                on_topic = topic_number(condition)
        return on_topic if yes else 0

    def analyse(self):
        """MIRRORS behaviourdatabase.cpp analyseDialogRules()"""
        rules = self.rules
        self.topic_money = {}
        for rule in rules:
            money = 0
            for action in rule.actions:
                if action[0] == 'createmoney':
                    money = 1
                elif action[0] == 'deletemoney':
                    money = -1
            on_topic = self.yes_topic(rule)
            if money == 0 or on_topic == 0:
                continue
            if on_topic not in self.topic_money:
                self.topic_money[on_topic] = money
            elif self.topic_money[on_topic] != money:
                self.topic_money[on_topic] = 0

        travel_topics = set()
        for rule in rules:
            if any(a[0] == 'teleport' for a in rule.actions):
                travel_topics.update(topic_number(c) for c in rule.conditions if topic_number(c) is not None)

        self.topic_items = {}
        for rule in rules:
            created = 0
            for action in rule.actions:
                if action[0] == 'create' and action[1] and number(action[1][0]) is not None:
                    created = number(action[1][0])
                    break
            on_topic = self.yes_topic(rule)
            if created and on_topic and on_topic not in self.topic_items:
                self.topic_items[on_topic] = created

        self.offers, seen, offered = [], set(), set()
        for amount_only in (False, True):
            for rule in self.none:
                if takes_amount(rule) != amount_only or not rule.words:
                    continue
                words = rule.words
                trade = self.trade_of(rule)
                if trade.item and trade.has_price and trade.has_topic and not continues_topic(rule):
                    if not amount_only:
                        if words not in seen:
                            seen.add(words)
                            offered.add((trade.item, trade.sell))
                            self.offers.append(Offer(rule, words, trade.item, trade.sell, False))
                    elif (trade.item, trade.sell) not in offered:
                        offered.add((trade.item, trade.sell))
                        bare = words[5:] if words.startswith('sell ') else words
                        with_one = ('sell 1 ' if trade.sell else '1 ') + bare
                        if with_one not in seen:
                            seen.add(with_one)
                            self.offers.append(Offer(rule, with_one, trade.item, trade.sell, False, bare))
                elif not amount_only and ((trade.teleports and trade.has_price) or
                                          (trade.item == 0 and trade.has_price and trade.sets_topic in travel_topics)):
                    if words not in seen:
                        seen.add(words)
                        self.offers.append(Offer(rule, words, 0, False, True))

    def trade_of(self, rule):
        """MIRRORS behaviourdatabase.cpp tradeOf()"""
        trade = Trade()
        for action in rule.actions:
            if action[0] == 'type' and action[1] and number(action[1][0]) is not None:
                trade.item = number(action[1][0])
            elif action[0] == 'price':
                trade.has_price = True
            elif action[0] == 'topic':
                trade.has_topic = True
                if action[1] and number(action[1][0]) is not None:
                    trade.sets_topic = number(action[1][0])
            elif action[0] == 'teleport':
                trade.teleports = True
        if trade.item == 0 and trade.has_price and not trade.teleports and trade.sets_topic in self.topic_items:
            trade.item = self.topic_items[trade.sets_topic]
        trade.sell = rule.words.startswith('sell ')
        if self.topic_money.get(trade.sets_topic, 0) != 0:
            trade.sell = self.topic_money[trade.sets_topic] > 0
        return trade

    def first_rules(self, topic, message):
        """The rules that answer the message first, for some player: the
        first one whose conditions could hold, and on past it while the
        one before holds for some players only."""
        for rule in self.none:
            if could_pass(rule, topic, message):
                yield rule
                if not depends_on_player(rule):
                    return

    def amount_words(self, offer):
        """MIRRORS behaviourdatabase.cpp offerAmountWords()"""
        ways = (['sell {n} ' + offer.bare] if offer.sell else []) + ['{n} ' + offer.bare]
        for rule in self.none:
            if takes_amount(rule) and rule.words:
                trade = self.trade_of(rule)
                if trade.item == offer.item and trade.sell == offer.sell:
                    words = rule.words
                    ways.append('sell {n} ' + words[5:] if words.startswith('sell ') else '{n} ' + words)
        for way in ways:
            for rule in self.first_rules(0, way.replace('{n}', '2')):
                trade = self.trade_of(rule)
                if takes_amount(rule) and trade.item == offer.item and trade.sell == offer.sell:
                    return way
        return ''

    def listed_offers(self):
        """The offers the dialog lists for some player (the first rule for
        the words, at topic 0, has a Price), with their amount words.
        MIRRORS behaviourdatabase.cpp sendDialog() (the offers)"""
        listed = {}
        for offer in self.offers:
            if any(any(a[0] == 'price' for a in rule.actions) for rule in self.first_rules(0, offer.words)):
                if not offer.travel:
                    offer.amount_words = self.amount_words(offer)
                listed[offer.words] = offer
        return listed

    def words(self, topic):
        """MIRRORS behaviourdatabase.cpp sendDialog() (the words loop): the
        topic answers and the other words the NPC takes now."""
        answers, others = [], []
        for rule in self.none:
            words = rule.words
            if takes_amount(rule) or not words or not could_pass(rule, topic, words):
                continue
            if continues_topic(rule):
                if words not in answers:
                    answers.append(words)
            elif words not in others:
                others.append(words)
        return answers, others

    def keywords(self, topic, listed, asks):
        """The keyword buttons, and whether Yes and No show, when the NPC's
        line asks something (asks) or not.
        MIRRORS behaviourdatabase.cpp sendDialog() (the keywords)"""
        answers, others = self.words(topic)
        question = asks and ('yes' in answers or (topic == 0 and 'yes' in others))
        keywords = [w for w in answers if w not in BYE_WORDS and not (question and w in ('yes', 'no'))]
        keywords += [w for w in others if w not in BYE_WORDS and not (question and w in ('yes', 'no'))
                     and w not in answers and w not in listed]
        return keywords, question


# ---------------------------------------------------------------------------
# The check


def states_of(rules):
    """The conversation states: the greeting (the topic it sets), the top
    level and every topic a rule sets."""
    greeting = sorted({sets_topic(r) or 0 for r in rules if r.situation == 'address'}) or [0]
    topics = sorted({0} | {sets_topic(r) for r in rules if sets_topic(r) is not None})
    return [('greeting', t) for t in greeting] + [('topic %d' % t, t) for t in topics]


def check_npc(path, verbose=False):
    name, rules = load_npc(path)
    dialog = Dialog(rules)
    listed = dialog.listed_offers()
    # what the shop says for an amount: "2 torch", "sell 2 rope", "1 worms"
    amount_said = [o.amount_words.replace('{n}', '2') for o in listed.values() if o.amount_words]
    amount_said += [o.words for o in listed.values() if o.words not in (o.bare, 'sell ' + o.bare)]
    result = {'name': name, 'file': os.path.basename(path), 'states': 0, 'words': 0,
              'gaps': [], 'typed': [], 'equivalent': [], 'lines': []}
    for label, topic in states_of(rules):
        result['states'] += 1
        # the NPC's line asks something (Yes and No show) or not
        variants = []
        for asks in (True, False):
            keywords, question = dialog.keywords(topic, listed, asks)
            covered = set(keywords) | set(listed) | BYE_WORDS | ({'yes', 'no'} if question else set())
            variants.append((keywords, covered, question))
        seen = set()
        for rule in dialog.none:
            if not rule.strings or not can_hold(rule, topic):
                continue
            key = (rule.words, takes_amount(rule))
            if key in seen:
                continue
            seen.add(key)
            result['words'] += 1
            if takes_amount(rule):
                trade = dialog.trade_of(rule)
                if not trade.item:
                    if any(not takes_amount(r) and r.words == rule.words and can_hold(r, topic) for r in dialog.none):
                        # "deposit 100": the "deposit" button asks how much
                        continue
                    # "transfer 100 to Name": typed by the player
                    result['typed'].append((label, rule))
                    continue
                # the shop's amount for an offer says these words
                if any(all(search_word(p, said) for p in rule.strings) for said in amount_said):
                    continue
                same = [o.words for o in listed.values() if o.amount_words and o.item == trade.item and o.sell == trade.sell]
                if same:
                    # "5 wolves" does what the shop's "5 wolf" does
                    result['equivalent'].append((label, rule, same[0]))
                    continue
                result['gaps'].append((label, rule, 'takes an amount, and no offer with an amount says it'))
                continue
            for keywords, covered, question in variants:
                if rule.words not in covered:
                    result['gaps'].append((label, rule, 'no button'))
                    break
        if verbose:
            keywords, covered, question = variants[0]
            usual = ['job', 'name', 'offer', 'trade']
            def order(words):
                return sorted(words, key=lambda w: (usual.index(w) if w in usual else len(usual), w))
            answers = dialog.words(topic)[0]
            keywords = order([w for w in keywords if w in answers]) + order([w for w in keywords if w not in answers])
            result['lines'].append('  %-10s %s%s' % (label, 'Yes, No; ' if question else '', ', '.join(keywords) or '-'))
    if verbose:
        for offer in listed.values():
            result['lines'].append('  offer      %s%s%s' % ('travel ' if offer.travel else ('sell ' if offer.sell else 'buy '),
                                                         offer.words, ' [amount: %s]' % offer.amount_words if offer.amount_words else ''))
    return result


def main(argv):
    verbose = '--verbose' in argv
    args = [a for a in argv if a != '--verbose']
    only = None
    if '--npc' in args:
        k = args.index('--npc')
        only = args[k + 1].lower()
        del args[k:k + 2]
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    directory = args[0] if args else os.path.join(root, 'data', 'npc')
    totals = {'npcs': 0, 'states': 0, 'words': 0, 'gaps': 0, 'typed': 0, 'equivalent': 0}
    errors = 0
    for f in sorted(f for f in os.listdir(directory) if f.endswith('.npc')):
        if only and only != f[:-4]:
            continue
        try:
            r = check_npc(os.path.join(directory, f), bool(only))
        except ScriptError as e:
            print('%s: cannot read: %s' % (f, e))
            errors += 1
            continue
        totals['npcs'] += 1
        totals['states'] += r['states']
        totals['words'] += r['words']
        for k in ('gaps', 'typed', 'equivalent'):
            totals[k] += len(r[k])
        if r['lines']:
            print('%s (%s): the buttons in each state (could-be-true conditions), and the offers' % (r['name'], f))
            print('\n'.join(r['lines']))
        for label, rule, why in r['gaps']:
            print('GAP %s %s: "%s" (%s): %s' % (f, label, rule.words, rule.where(), why))
        if verbose or only:
            for label, rule in r['typed']:
                print('typed %s %s: "%s" with a number or name the player types (%s)' % (f, label, rule.words, rule.where()))
            for label, rule, offer in r['equivalent']:
                print('same %s %s: "%s" (%s) does what the offer "%s" does with an amount' % (f, label, rule.words, rule.where(), offer))
    print('%(npcs)d NPCs, %(states)d states, %(words)d words: %(gaps)d without a button; '
          '%(typed)d need a number or name typed, %(equivalent)d amount words do what an offer with an amount does' % totals)
    return 1 if totals['gaps'] or errors or totals['npcs'] == 0 else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
