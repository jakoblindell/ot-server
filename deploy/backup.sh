#!/bin/bash
# Runs in the backup container: dumps the database every
# BACKUP_INTERVAL_HOURS into /backups (deploy/backups on the host) and deletes
# dumps older than BACKUP_KEEP_DAYS. The dump is one consistent snapshot
# taken while the server runs (--single-transaction; the tables are InnoDB).
# The triggers' DEFINER (root, from the first start) is left out so the
# server's own database user can restore the dump.
set -uo pipefail
umask 077 # the dumps hold password hashes

interval=$(( ${BACKUP_INTERVAL_HOURS:-6} * 3600 ))
keep=${BACKUP_KEEP_DAYS:-14}
export MYSQL_PWD=$DB_PASSWORD

backup() {
	file=/backups/$DB_NAME-$(date -u +%Y%m%d-%H%M%S).sql.gz
	if mariadb-dump -h "$DB_HOST" -u "$DB_USER" --single-transaction --quick --routines --triggers "$DB_NAME" \
		| sed -E 's/ DEFINER=`[^`]+`@`[^`]+`//' | gzip > "$file.partial"; then
		mv "$file.partial" "$file"
		echo "backup: $file ($(du -h "$file" | cut -f1))"
	else
		rm -f "$file.partial"
		echo "backup: FAILED" >&2
	fi
	find /backups -name "$DB_NAME-*.sql.gz" -mtime +"$keep" -delete
}

if [ "${1:-}" = "now" ]; then
	backup
	exit
fi

while true; do
	backup
	sleep "$interval"
done
