"""Prints SQL that creates test characters: a knight, paladin, sorcerer and
druid at level 40 with equipment, runes and supplies, and a gamemaster on a
god account (for /m, /i and the other GM commands). Each is on its own
account, so they can all be online at once. Running it again recreates them.

    python3 tools/testchars/create_test_characters.py | mysql sabrehaven
    # with the Docker Compose setup, from deploy/:
    python3 ../tools/testchars/create_test_characters.py | \\
        docker compose exec -T db sh -c 'mariadb -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"'

Accounts 600001-600005, password "test". Items are given by name (from
data/items792/items.srv; runes by their spells.xml name), so a misspelled
name stops the script instead of creating the wrong item.
"""
import os
import re
import sys
import xml.etree.ElementTree as ET

DATA = os.path.join(os.path.dirname(__file__), "..", "..", "data")
PASSWORD = "test"
LEVEL = 40
TEMPLE = (32369, 32241, 7)  # Thais
TOWN_ID = 1

# Inventory slots (player_items.pid)
HEAD, NECK, BACK, BODY, RIGHT, LEFT, LEGS, FEET, RING, AMMO = range(1, 11)

# Per vocation gains from data/XML/vocations.xml (base values are level 8)
VOCATION_GAINS = {1: (5, 30, 10), 2: (5, 30, 10), 3: (10, 15, 20), 4: (15, 5, 25)}

SUPPLIES = [("ham", 20), ("gold coin", 100), ("gold coin", 100), ("platinum coin", 30),
            ("rope", 1), ("shovel", 1)]
MAGE_RUNES = [("Sudden Death Rune", 25), ("Heavy Magic Missile Rune", 25), ("Great Fireball Rune", 25),
              ("Explosion Rune", 25), ("Ultimate Healing Rune", 5), ("Intense Healing Rune", 5),
              ("Magic Wall Rune", 5), ("Paralyze Rune", 5), ("Destroy Field Rune", 5),
              ("Energy Field Rune", 5), ("Fire Field Rune", 5), ("Poison Field Rune", 5)]

CHARACTERS = [
    {
        "account": 600001, "name": "Knight Test", "vocation": 4, "looktype": 131, "maglevel": 4,
        "skills": {"sword": 70, "axe": 70, "club": 70, "shielding": 65},
        "equipment": {HEAD: "steel helmet", BODY: "plate armor", LEGS: "plate legs", FEET: "leather boots",
                      RIGHT: "spike sword", LEFT: "dwarven shield", NECK: "amulet of loss"},
        "backpack": [("Ultimate Healing Rune", 5), ("Intense Healing Rune", 5), ("battle axe", 1),
                     ("mace", 1)] + SUPPLIES,
    },
    {
        "account": 600002, "name": "Paladin Test", "vocation": 3, "looktype": 129, "maglevel": 15,
        "skills": {"dist": 70, "shielding": 40},
        "equipment": {HEAD: "steel helmet", BODY: "brass armor", LEGS: "plate legs", FEET: "leather boots",
                      LEFT: "bow", AMMO: ("arrow", 100)},
        "backpack": [("spear", 10), ("crossbow", 1), ("bolt", 100), ("Sudden Death Rune", 25),
                     ("Heavy Magic Missile Rune", 25), ("Explosion Rune", 25),
                     ("Ultimate Healing Rune", 5)] + SUPPLIES,
    },
    {
        "account": 600003, "name": "Sorcerer Test", "vocation": 1, "looktype": 130, "maglevel": 45,
        "skills": {"shielding": 20},
        "equipment": {HEAD: "mystic turban", BODY: "blue robe", LEGS: "plate legs", FEET: "leather boots",
                      RIGHT: "wand of vortex", LEFT: "spellbook"},
        "backpack": MAGE_RUNES + SUPPLIES,
    },
    {
        "account": 600004, "name": "Druid Test", "vocation": 2, "looktype": 130, "maglevel": 45,
        "skills": {"shielding": 20},
        "equipment": {HEAD: "mystic turban", BODY: "blue robe", LEGS: "plate legs", FEET: "leather boots",
                      RIGHT: "snakebite rod", LEFT: "spellbook"},
        "backpack": MAGE_RUNES + SUPPLIES,
    },
    {
        "account": 600005, "name": "GM Test", "vocation": 0, "looktype": 75, "maglevel": 0, "group": 3,
        "account_type": 5, "skills": {}, "equipment": {}, "backpack": [],
    },
]


def experience(level):
    return (50 * (level - 1) ** 3 - 150 * (level - 1) ** 2 + 400 * (level - 1)) // 3


def load_items():
    """Item name (without article, lower case) -> id, from items.srv and spells.xml runes."""
    names = {}
    text = open(os.path.join(DATA, "items792", "items.srv"), encoding="latin-1").read()
    for block in re.split(r"\n\s*\n", text):
        type_id = re.search(r"^TypeID\s*=\s*(\d+)", block, re.M)
        name = re.search(r'^Name\s*=\s*"([^"]*)"', block, re.M)
        if type_id and name and name.group(1):
            key = re.sub(r"^(a|an|some|the) ", "", name.group(1).lower())
            names.setdefault(key, int(type_id.group(1)))
    for rune in ET.parse(os.path.join(DATA, "spells", "spells.xml")).getroot().findall("rune"):
        name = rune.get("name")
        if not name.lower().endswith(" rune"):
            name += " Rune"
        names[name.lower()] = int(rune.get("id"))
    return names


def main():
    items = load_items()

    def item_id(name):
        key = name.lower()
        if key not in items:
            sys.exit(f"unknown item: {name}")
        return items[key]

    def quote(text):
        return "'" + text.replace("'", "''") + "'"

    names = ", ".join(quote(c["name"]) for c in CHARACTERS)
    accounts = ", ".join(str(c["account"]) for c in CHARACTERS)
    out = ["START TRANSACTION;",
           f"DELETE FROM player_items WHERE player_id IN (SELECT id FROM players WHERE name IN ({names}));",
           f"DELETE FROM znote_players WHERE player_id IN (SELECT id FROM players WHERE name IN ({names}));",
           f"DELETE FROM players WHERE name IN ({names});",
           f"DELETE FROM znote_accounts WHERE account_id IN (SELECT id FROM accounts WHERE name IN ({accounts}));",
           f"DELETE FROM accounts WHERE name IN ({accounts});"]

    for c in CHARACTERS:
        voc = c["vocation"]
        hp_gain, mana_gain, cap_gain = VOCATION_GAINS.get(voc, (5, 5, 10))
        health = 185 + (LEVEL - 8) * hp_gain
        mana = 35 + (LEVEL - 8) * mana_gain
        cap = 470 + (LEVEL - 8) * cap_gain
        skills = c["skills"]
        x, y, z = TEMPLE
        out.append(f"INSERT INTO accounts (name, password, type, premdays, creation) VALUES "
                   f"({c['account']}, SHA1({quote(PASSWORD)}), {c.get('account_type', 1)}, 365, UNIX_TIMESTAMP());")
        out.append("SET @account = LAST_INSERT_ID();")
        out.append("INSERT INTO znote_accounts (account_id, ip, created, flag) VALUES (@account, 0, UNIX_TIMESTAMP(), '');")
        out.append(
            "INSERT INTO players (name, group_id, account_id, level, vocation, health, healthmax, experience, "
            "looktype, lookhead, lookbody, looklegs, lookfeet, maglevel, mana, manamax, soul, town_id, "
            "posx, posy, posz, cap, sex, conditions, skill_sword, skill_axe, skill_club, skill_dist, skill_shielding) "
            f"VALUES ({quote(c['name'])}, {c.get('group', 1)}, @account, {LEVEL}, {voc}, {health}, {health}, "
            f"{experience(LEVEL)}, {c['looktype']}, 78, 69, 58, 76, {c['maglevel']}, {mana}, {mana}, 100, {TOWN_ID}, "
            f"{x}, {y}, {z}, {cap}, 1, '', {skills.get('sword', 10)}, {skills.get('axe', 10)}, "
            f"{skills.get('club', 10)}, {skills.get('dist', 10)}, {skills.get('shielding', 10)});")
        out.append("SET @player = LAST_INSERT_ID();")
        out.append("INSERT INTO znote_players (player_id, created, hide_char, comment) VALUES (@player, UNIX_TIMESTAMP(), 0, '');")

        # sid numbering as the server saves it: inventory items from 101, then
        # container contents, each pointing at its container's sid
        rows, sid = [], 100
        equipment = dict(c["equipment"])
        if c["backpack"]:
            equipment[BACK] = "backpack"
        for slot in sorted(equipment):
            entry = equipment[slot]
            name, count = entry if isinstance(entry, tuple) else (entry, 1)
            sid += 1
            rows.append((slot, sid, item_id(name), count))
        if c["backpack"]:
            backpack_sid = next(r[1] for r in rows if r[0] == BACK)
            # A backpack holds 20 items; the rest go into a second one inside it
            contents = list(c["backpack"])
            extra = contents[19:]
            contents = contents[:19]
            if extra:
                sid += 1
                inner_sid = sid
                rows.append((backpack_sid, inner_sid, item_id("backpack"), 1))
            for name, count in contents:
                sid += 1
                rows.append((backpack_sid, sid, item_id(name), count))
            for name, count in extra:
                sid += 1
                rows.append((inner_sid, sid, item_id(name), count))
        for pid, item_sid, itemtype, count in rows:
            out.append(f"INSERT INTO player_items (player_id, pid, sid, itemtype, count, attributes) "
                       f"VALUES (@player, {pid}, {item_sid}, {itemtype}, {count}, '');")
    out.append("COMMIT;")
    print("\n".join(out))


if __name__ == "__main__":
    main()
