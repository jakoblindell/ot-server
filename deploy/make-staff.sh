#!/bin/sh
# Gives an account a staff role (the first god has to be made this way; after
# that, gods change roles on the website under Admin > Staff & roles).
#   ./make-staff.sh ACCOUNT_NAME god|gamemaster|player
# Staff need two-step login (set up on the account page) before the admin
# pages open. The account's characters move to the matching game group.
set -eu

if [ $# -ne 2 ]; then
	echo "usage: $0 ACCOUNT_NAME god|gamemaster|player" >&2
	exit 1
fi

case $1 in
	*[!A-Za-z0-9]*|'') echo "the account name may only contain letters and digits" >&2; exit 1 ;;
esac
case $2 in
	god) type=5; group=3 ;;
	gamemaster) type=4; group=2 ;;
	player) type=1; group=1 ;;
	*) echo "role must be god, gamemaster or player" >&2; exit 1 ;;
esac

cd "$(dirname "$0")"
docker compose exec -T db sh -c 'mariadb -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"' <<SQL
UPDATE accounts SET type = $type WHERE name = '$1';
UPDATE players p JOIN accounts a ON a.id = p.account_id SET p.group_id = $group WHERE a.name = '$1';
SELECT CONCAT(name, ' is now type ', type) AS result FROM accounts WHERE name = '$1';
SQL
