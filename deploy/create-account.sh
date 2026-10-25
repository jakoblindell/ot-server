#!/bin/sh
# Creates an account with one character in the running compose database.
#   ./create-account.sh ACCOUNT_NAME PASSWORD "Character Name" [premium days]
# The character starts as a level 8 knight in Thais. The password is stored as
# SHA-1, which the server replaces with its salted hash on the first login.
set -eu

if [ $# -lt 3 ]; then
	echo "usage: $0 ACCOUNT_NAME PASSWORD \"Character Name\" [premium days]" >&2
	exit 1
fi

account=$1
password=$2
name=$3
premdays=${4:-0}

case $account in
	*[!A-Za-z0-9]*|'') echo "the account name may only contain letters and digits" >&2; exit 1 ;;
esac

sql_quote() {
	printf "'%s'" "$(printf '%s' "$1" | sed "s/'/''/g")"
}

cd "$(dirname "$0")"
docker compose exec -T db sh -c 'mariadb -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"' <<EOF
INSERT INTO accounts (name, password, type, premdays, creation)
VALUES ($(sql_quote "$account"), SHA1($(sql_quote "$password")), 1, $premdays, UNIX_TIMESTAMP());
SET @account_id = LAST_INSERT_ID();
INSERT INTO znote_accounts (account_id, ip, created, flag)
VALUES (@account_id, 0, UNIX_TIMESTAMP(), '');

INSERT INTO players (name, group_id, account_id, level, vocation, health, healthmax, experience,
                     looktype, maglevel, mana, manamax, town_id, posx, posy, posz, cap, sex, conditions)
VALUES ($(sql_quote "$name"), 1, @account_id, 8, 4, 185, 185, 4200,
        128, 0, 35, 35, 1, 32369, 32241, 7, 470, 1, '');
-- Znote AAC and the power gamers statistics expect a row per character
INSERT INTO znote_players (player_id, created, hide_char, comment)
VALUES (LAST_INSERT_ID(), UNIX_TIMESTAMP(), 0, '');
EOF

echo "Created account $account with character $name."
