#!/bin/bash
# The game server's editable files (data/ and config.lua), kept in a git
# repository in the game-files volume so the website can edit them:
#
#   $FILES/repo.git   the repository (branches image, live, staged)
#   $FILES/live       what the server runs (data/, config.lua)
#   $FILES/staged     what staff edit on the website; the difference to
#                     live is the "pending changes"
#   $FILES/status     the result of the last start, for the admin pages
#
# Runs before every server start (run-server.sh), so also after every server
# save:
#   1. the staged changes are merged into live: they go live now;
#   2. the files of the server image (a new build) are committed on the
#      image branch and merged into live, so staff edits survive updates;
#   3. staged catches up with live.
# An image update that clashes with staff edits is left out (the server
# starts with what it had); the clashing files are listed in the status file
# and staff choose on the website whose version to keep.
#
# The map files (*.otbm, ~80 MB each) are not in git: they stay in the image
# and are linked into live.
set -uo pipefail

FILES=${GAME_FILES:-/srv/game-files}
IMAGE=${GAME_IMAGE_FILES:-/srv/sabrehaven/image}
MAPS=${GAME_MAPS:-/srv/sabrehaven/maps}

export GIT_AUTHOR_NAME="Elderwood server" GIT_AUTHOR_EMAIL="server@elderwood.invalid"
export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME" GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
git() { command git -c safe.directory='*' -c core.quotePath=false "$@"; }

status=()
note() {
	echo "game files: $*"
	status+=("$*")
}

# The image's files, as a commit on the image branch
commit_image() {
	local work="$FILES/.image"
	rm -rf "$work"
	git -C "$FILES/repo.git" worktree prune
	git -C "$FILES/repo.git" worktree add -q "$work" image || return 1
	git -C "$work" rm -rq --ignore-unmatch . 2>/dev/null
	cp -a "$IMAGE/." "$work/"
	printf '*.otbm\n' > "$work/.gitignore"
	git -C "$work" add -A
	if ! git -C "$work" diff --cached --quiet; then
		git -C "$work" commit -qm "Server image $(date -u +%Y-%m-%dT%H:%MZ)"
		note "the server image has new files"
	fi
	git -C "$FILES/repo.git" worktree remove --force "$work"
}

quiet() { "$@" >/dev/null 2>&1; }

if [ ! -d "$FILES/repo.git" ]; then
	note "first start: creating the repository"
	git init -q --bare -b image "$FILES/repo.git"
	# an empty first commit, so the image branch exists for its worktree
	tree=$(git -C "$FILES/repo.git" hash-object -t tree -w /dev/null)
	commit=$(echo "Start" | git -C "$FILES/repo.git" commit-tree "$tree")
	git -C "$FILES/repo.git" update-ref refs/heads/image "$commit"
	commit_image
	git -C "$FILES/repo.git" branch live image
	git -C "$FILES/repo.git" branch staged image
	git -C "$FILES/repo.git" worktree add -q "$FILES/live" live
	git -C "$FILES/repo.git" worktree add -q "$FILES/staged" staged
fi

# Staged changes go live (staged builds on live, so this does not clash)
pending=$(git -C "$FILES/live" diff --name-only live staged | wc -l)
if [ "$(git -C "$FILES/live" rev-list --count live..staged)" -gt 0 ]; then
	if quiet git -C "$FILES/live" merge --no-edit -m "Server start: staged changes go live" staged; then
		note "staged changes went live ($pending file(s))"
	else
		quiet git -C "$FILES/live" merge --abort
		note "CONFLICT: the staged changes clash with live files; they were not applied"
	fi
fi

# New files from the server image
commit_image
if ! quiet git -C "$FILES/live" merge --no-edit -m "Server start: new files from the server image" image; then
	clashing=$(git -C "$FILES/live" diff --name-only --diff-filter=U)
	quiet git -C "$FILES/live" merge --abort
	note "CONFLICT: new files from the server image clash with staff edits; choose on the website which to keep"
	for file in $clashing; do status+=("clash=$file"); done
fi

quiet git -C "$FILES/staged" merge --no-edit live || {
	quiet git -C "$FILES/staged" merge --abort
	note "CONFLICT: could not bring the staged files up to date"
}

# The maps, from the image
if [ -d "$MAPS" ]; then
	(cd "$MAPS" && find . -name '*.otbm') | while read -r map; do
		mkdir -p "$FILES/live/$(dirname "$map")"
		ln -sfn "$MAPS/${map#./}" "$FILES/live/${map#./}"
	done
fi

{
	echo "started=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
	echo "live=$(git -C "$FILES/live" rev-parse --short HEAD)"
	for line in "${status[@]}"; do
		case $line in clash=*) echo "$line" ;; *) echo "note=$line" ;; esac
	done
} > "$FILES/status"
exit 0
