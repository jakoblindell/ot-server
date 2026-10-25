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
# The website (user 1000) lists and downloads the dumps and asks for one by
# leaving .backup-now here
OWNER=${BACKUP_OWNER:-1000}
keep=${BACKUP_KEEP_DAYS:-14}
export MYSQL_PWD=$DB_PASSWORD

backup() {
	file=/backups/$DB_NAME-$(date -u +%Y%m%d-%H%M%S).sql.gz
	if mariadb-dump -h "$DB_HOST" -u "$DB_USER" --single-transaction --quick --routines --triggers "$DB_NAME" \
		| sed -E 's/ DEFINER=`[^`]+`@`[^`]+`//' | gzip > "$file.partial"; then
		mv "$file.partial" "$file"
		chown "$OWNER" "$file" 2>/dev/null
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

chown "$OWNER" /backups 2>/dev/null
chmod 700 /backups
while true; do
	backup
	waited=0
	while [ "$waited" -lt "$interval" ]; do
		sleep 30
		waited=$((waited + 30))
		if [ -f /backups/.backup-now ]; then
			rm -f /backups/.backup-now
			echo "backup: asked for on the website"
			break
		fi
	done
done
