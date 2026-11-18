#!/bin/bash
# Deploys one commit's images on the staging host (ot-server#34). GitHub
# Actions runs it over SSH with the staging deploy key, whose
# authorized_keys entry forces this command, so the key can do nothing else:
#
#   command="/srv/ot-server/deploy/staging-deploy.sh",restrict ssh-ed25519 AAAA... staging-deploy
#
# The SSH command is "deploy <full commit sha>"; stdin carries a short-lived
# token for pulling the images from GitHub's registry. See STAGING.md.
#
# Everything is inside main(), so bash has read the whole script before the
# git checkout below replaces this file.
set -euo pipefail

IMAGES=ghcr.io/jakoblindell/ot-server

main() {
	local action sha extra
	read -r action sha extra <<<"${SSH_ORIGINAL_COMMAND:-}"
	if [[ $action != deploy || ! $sha =~ ^[0-9a-f]{40}$ || -n ${extra:-} ]]; then
		echo "usage: deploy <full commit sha>" >&2
		exit 2
	fi
	local token
	token=$(head -c 4096)

	cd "$(dirname "$(readlink -f "$0")")/.."

	echo "== Code: $sha"
	git fetch --quiet origin
	# -f: staging runs the commit as merged; local edits to tracked files are
	# dropped (.env, secrets/ and backups/ are not tracked and stay)
	git checkout --quiet --force --detach "$sha"

	cd deploy
	# Image settings live in .env, so a manual "docker compose up -d" later
	# keeps running the same images
	set_env IMAGES "$IMAGES"
	set_env IMAGE_TAG "sha-$sha"

	echo "== Images: $IMAGES/{server,site,web}:sha-$sha"
	printf '%s' "$token" | docker login ghcr.io --username deploy --password-stdin >/dev/null
	local status=0
	docker compose pull --quiet server site web || status=$?
	docker logout ghcr.io >/dev/null || true
	[[ $status -eq 0 ]] || exit "$status"

	echo "== Restart"
	docker compose up -d --remove-orphans
	# Images of earlier deploys, unused for a week
	docker image prune --all --force --filter until=168h >/dev/null || true
	docker compose ps
}

# Sets KEY=value in .env (adds the line, or replaces it)
set_env() {
	if grep -q "^$1=" .env; then
		sed -i "s|^$1=.*|$1=$2|" .env
	else
		printf '%s=%s\n' "$1" "$2" >>.env
	fi
}

main
exit
