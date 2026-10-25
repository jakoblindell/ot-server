#!/bin/sh
# Replaces the database with a backup: ./restore.sh backups/FILE.sql.gz
# The game server is stopped meanwhile (it would save over the restored data)
# and started again afterwards, also when the restore fails. The current
# state is backed up first.
set -eu

if [ $# -ne 1 ] || [ ! -f "$1" ]; then
	echo "usage: $0 backups/FILE.sql.gz" >&2
	exit 1
fi

docker compose stop server
trap 'docker compose start server' EXIT
docker compose exec -T backup /backup.sh now
# DEFINER clauses (in dumps made before backup.sh left them out) need rights
# the server's database user does not have
gunzip -c "$1" | sed -E 's/ DEFINER=`[^`]+`@`[^`]+`//' \
	| docker compose exec -T db sh -c 'mariadb -u"$MARIADB_USER" -p"$MARIADB_PASSWORD" "$MARIADB_DATABASE"'
echo "restored $1"
