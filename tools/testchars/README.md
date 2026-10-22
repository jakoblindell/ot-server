# Test characters

`create_test_characters.py` prints SQL that creates five characters for
testing, each on its own account (password `test`) so they can be online
together. They start in the Thais temple; running the script again
recreates them with their original equipment.

| Account | Character | Notes |
|---|---|---|
| 600001 | Knight Test | level 40, sword/axe/club 70, healing runes |
| 600002 | Paladin Test | level 40, distance 70, bow and arrows, spears, attack runes |
| 600003 | Sorcerer Test | level 40, magic level 45, attack, healing and field runes |
| 600004 | Druid Test | level 40, magic level 45, same runes |
| 600005 | GM Test | god account: GM commands such as `/m orc` (summon), `/i 3155, 10` (create item), `/goto`, `/c`, `/a` |

Each fighter carries food, a rope, a shovel, two stacks of 100 gold (to
test changing coins) and platinum coins.

```sh
python3 tools/testchars/create_test_characters.py | mysql sabrehaven
# Docker Compose setup, from deploy/:
python3 ../tools/testchars/create_test_characters.py | \
    docker compose exec -T db sh -c 'mariadb -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"'
```

Log the characters out first: the server overwrites a character's row
when it logs out. Monsters can't be summoned in protection zones such as
the temple.
