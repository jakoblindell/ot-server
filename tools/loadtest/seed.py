"""Prints SQL that creates COUNT bot accounts, one character each.

    python3 seed.py COUNT [FIRST_ACCOUNT] [PROBES] | mysql sabrehaven

Account numbers start at FIRST_ACCOUNT (default 9000000), the password is
"bot" and characters are called "Bot 0001" and so on. Characters start at
house entrances (data/world792/houses.xml), which are walkable tiles spread
over every city, so they do not all spawn on one temple. The first PROBES
characters (default 10, matching swarm.js --probes) start together at the
most isolated house instead.
"""
import os
import re
import sys

HOUSES = os.path.join(os.path.dirname(__file__), "..", "..", "data", "world792", "houses.xml")


def main():
    count = int(sys.argv[1])
    first = int(sys.argv[2]) if len(sys.argv) > 2 else 9000000
    probes = int(sys.argv[3]) if len(sys.argv) > 3 else 10

    entries = [tuple(int(v) for v in e)
               for e in re.findall(r'entryx="(\d+)" entryy="(\d+)" entryz="(\d+)"', open(HOUSES).read())]
    if not entries:
        sys.exit("no house entries found")

    # Probe bots (the first PROBES accounts, see swarm.js) stand next to each
    # other at the most isolated house, so no other bot's traffic gets mixed
    # into their ping replies. Everyone else uses the remaining houses.
    def distance_to_nearest(entry):
        return min(max(abs(entry[0] - o[0]), abs(entry[1] - o[1])) + 100 * abs(entry[2] - o[2])
                   for o in entries if o != entry)

    isolated = max(entries, key=distance_to_nearest)
    others = [e for e in entries if e != isolated]

    print("START TRANSACTION;")
    for i in range(count):
        account = first + i
        if i < probes:
            x, y, z = isolated
            x += i
        else:
            j = i - probes
            x, y, z = others[j % len(others)]
            # Second and later laps around the houses stand one tile further away
            x += j // len(others)
        print(
            f"INSERT INTO accounts (name, password, type, premdays, creation) "
            f"VALUES ({account}, SHA1('bot'), 1, 30, UNIX_TIMESTAMP());"
        )
        print(
            "INSERT INTO players (name, group_id, account_id, level, vocation, health, healthmax, experience, "
            "looktype, maglevel, mana, manamax, town_id, posx, posy, posz, cap, sex, conditions) "
            f"VALUES ('Bot {i + 1:04d}', 1, LAST_INSERT_ID(), 8, 4, 185, 185, 4200, "
            f"128, 0, 35, 35, 1, {x}, {y}, {z}, 470, 1, '');"
        )
    print("COMMIT;")


if __name__ == "__main__":
    main()
