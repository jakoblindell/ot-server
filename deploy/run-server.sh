#!/bin/bash
# Runs the game server in the container. A crash ends the container and
# Docker starts it again (restart: unless-stopped). This script also catches
# a server that still runs but no longer answers (a deadlock or an endless
# script loop): once the server is up it asks for its status every 30
# seconds, and after 4 unanswered requests in a row it kills the server, so
# the container restarts. The status reply comes from the game's main
# thread, so it fails when that thread is stuck.
#
# docker stop sends SIGTERM, which is passed on: the server saves and kicks
# the players and exits (compose gives it stop_grace_period to finish).

INTERVAL=${WATCHDOG_INTERVAL:-30}
FAILURES=${WATCHDOG_FAILURES:-4}

./tfs &
server=$!
trap 'kill -TERM $server 2>/dev/null' TERM INT

answers() {
	timeout 10 bash -c 'exec 3<>/dev/tcp/127.0.0.1/7171 && printf "\x06\x00\xff\xffinfo" >&3 && head -c 5 <&3' 2>/dev/null \
		| grep -q '<?xml'
}

watchdog() {
	# Loading the map takes a while: wait for the first answer
	until answers; do
		kill -0 $server 2>/dev/null || return
		sleep 5
	done
	failed=0
	while kill -0 $server 2>/dev/null; do
		sleep $INTERVAL
		if answers; then
			failed=0
		else
			failed=$((failed + 1))
			echo "watchdog: no status answer ($failed of $FAILURES)"
			if [ $failed -ge $FAILURES ]; then
				echo "watchdog: the server is not responding, killing it"
				kill -KILL $server
				return
			fi
		fi
	done
}
watchdog &
watchdogPid=$!

# wait returns early when a signal arrives; wait again for the server to exit
while kill -0 $server 2>/dev/null; do
	wait $server
	status=$?
done
kill $watchdogPid 2>/dev/null
exit ${status:-1}
