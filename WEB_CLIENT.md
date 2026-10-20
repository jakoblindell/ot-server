# Browser client setup (otclient web build, protocol 7.92)

Tested with the `web-client-792` branches of `jakoblindell/ot-server` and
`jakoblindell/ot-client`: login, character list, entering the world, walking
and chat all work from Chromium.

## Pieces

The server speaks WebSocket itself on its normal ports: a connection that
starts with an HTTP upgrade request is handled as WebSocket, anything else as
the classic TCP protocol, so desktop clients keep working. TLS is terminated
by a reverse proxy (Caddy below).

| Piece | Listens on | Notes |
|---|---|---|
| Sabrehaven (`tfs`) | `127.0.0.1:7171` (login), `127.0.0.1:7172` (game) | `bindOnlyGlobalAddress = true`, `trustForwardedFor = true` |
| Reverse proxy, login | public `:7171` (TLS) | `wss://` to `127.0.0.1:7171` |
| Reverse proxy, game + web | public `:443` (TLS) | WebSocket upgrades to `127.0.0.1:7172`, other requests serve the client bundle |

The game proxy must be on **443**: the otclient browser build rewrites game
port 7172 to 443 (`src/client/protocolgame.cpp`). If `gameProtocolPort` is
anything other than 7172, the browser connects to that port unchanged.

The browser reuses the hostname it logged in with for the game connection
(the 7.92 character list can only carry an IPv4 address), so the TLS
certificate only needs that hostname.

`trustForwardedFor = true` makes the server take the client address from
`X-Forwarded-For` when the connection comes from a loopback or private
address, so connection flood limits, IP bans and `lastip` apply per player
rather than to the proxy. Only enable it when the game ports are not reachable
directly from the internet.

Example Caddyfile. Port 443 serves both the client page and the game
connection: WebSocket upgrade requests go to the game server, everything else
to the files.

```
game.example.com {
	@game header Upgrade websocket
	reverse_proxy @game 127.0.0.1:7172

	root * /srv/otclient-web
	header {
		Cross-Origin-Opener-Policy same-origin
		Cross-Origin-Embedder-Policy require-corp
	}
	file_server
}

game.example.com:7171 {
	reverse_proxy 127.0.0.1:7171
}
```

## Client bundle

Download `otclient-web.zip` from the `web-client-792-latest` release of
`jakoblindell/ot-client`. It does not contain the 7.92 `Tibia.dat`/`Tibia.spr`;
package them separately with Emscripten's file packager, from a checkout that
has them in `data/things/792/`:

```sh
python3 emsdk/upstream/emscripten/tools/file_packager.py things792.data \
  --preload data/things/792@/data/things/792 \
  --js-output=things792.js --use-preload-cache
```

Copy `things792.data` and `things792.js` next to `otclient.html` and load the
package before the client script:

```html
<script src=things792.js></script><script async src=otclient.js></script>
```

## Web server headers

The build uses threads, which need cross-origin isolation:

```
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Embedder-Policy: require-corp
```

Serve `.wasm` as `application/wasm`. The page must be HTTPS; the release build
connects with `wss://`.

## Logging in

In the login window: server = your hostname, port = 7171, client version = 792.

## Known issues

- Before client build d99fc01, a failed game connection (for example nothing
  listening on 443) made the client stop redrawing. It now shows "Connection
  Error" and returns to the character list.
- The client logs "extended opcodes are not enabled". This is expected: it
  reports itself as a classic client for 7.80-7.92 so the server keeps to the
  standard protocol.
