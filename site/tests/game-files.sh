#!/bin/bash
# The game-files volume for the layout checks (admin pages): the server's
# files of this checkout, without the maps, set up by deploy/game-files.sh.
#   site/tests/game-files.sh DIR    then run the site with GAME_FILES=DIR
set -euo pipefail
dir=$(realpath -m "$1")
repo=$(cd "$(dirname "$0")/../.." && pwd)
image=$(mktemp -d)
cp "$repo/config.lua" "$image/"
tar -C "$repo" --exclude='*.otbm' -cf - data | tar -C "$image" -xf -
mkdir -p "$dir/logs"
GAME_FILES=$dir GAME_IMAGE_FILES=$image GAME_MAPS=/nonexistent bash "$repo/deploy/game-files.sh" >/dev/null
printf '%s\n' '[2026-11-19 08:00:01] Server Online!' \
	'[2026-11-19 08:00:02] a/very/long/log/line/without/spaces/that/would/push/the/page/wider/than/a/phone/screen/if/it/were/not/wrapped' \
	> "$dir/logs/server.log"
rm -rf "$image"
# Two database dumps, for Admin > Backups (run the site with BACKUPS_DIR=DIR/backups)
mkdir -p "$dir/backups"
echo "-- dump" | gzip > "$dir/backups/sabrehaven-2026-11-18T0800Z.sql.gz"
echo "-- dump" | gzip > "$dir/backups/sabrehaven-2026-11-19T0800Z.sql.gz"
