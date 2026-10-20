# Load test

`seed.py` creates bot accounts and `swarm.js` (Node 22, no dependencies)
logs them into the game world, where they walk every 1-3 seconds, say
something every 30-90 seconds and answer keep-alives. Ten probe bots stand
still at the most isolated house and send a ping request every 5 seconds;
the server answers it from the game loop, so the round trip shows how far
behind the game loop is.

```sh
python3 seed.py 1200 | mysql sabrehaven          # once
node swarm.js --count 1200 --rate 20 --duration 600
```

Bots connect over TCP from 127.0.0.10 and up so that the per-address
connection flood limit behaves as it does with real players. With
`--ws wss://host:443` they go through a WebSocket URL instead, which on one
machine means one source address for all of them.

## Results (2026-10-20)

Server built from `web-client-792`, MariaDB on the same machine, 4 vCPU
Intel Xeon @ 2.80GHz cloud VM shared with the bots, 1200 bots joining at
20 per second, 7 and 10 minute runs:

| | |
|---|---|
| Logged in | 1200 of 1200, no failed logins, no disconnects |
| Game thread (busiest server thread) | 16% average, 29% peak of one core |
| Whole server process | about 35% of one core |
| Server memory | 1.62 GB, the same as with nobody online (the map dominates) |
| Probe round trip | median 7 ms, 95th percentile 14 ms (per-10-second medians) |

Occasional probe round trips of 1-2 seconds showed up while the game thread
stayed below 30%; they come from the measurement (a probe only recognises a
reply that arrives in a packet of its own, so a reply bundled with other
updates is matched to a later ping), not from the server stalling.

What this does not cover: bots do not fight, cast spells, use items or trade,
and monster AI near players adds work the bots do not trigger. Real players
will cost more per head than these bots, but the game thread had roughly
three times the headroom of the peak seen here.
