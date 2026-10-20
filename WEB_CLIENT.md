# Browser client setup (otclient web build, protocol 7.92)

Tested with the `web-client-792` branches of `jakoblindell/ot-server` and
`jakoblindell/ot-client`: login, character list, entering the world, walking
and chat all work from Chromium.

## Pieces

| Piece | Listens on | Notes |
|---|---|---|
| Sabrehaven (`tfs`) | `127.0.0.1:7171` (login), `127.0.0.1:7172` (game) | `bindOnlyGlobalAddress = true`, `ip = "127.0.0.1"` |
| WebSocket bridge, login | public `:7171` (TLS) | forwards to `127.0.0.1:7171` |
| WebSocket bridge, game | public `:443` (TLS) | forwards to `127.0.0.1:7172` |
| Web server | public HTTPS | serves the client bundle with the headers below |

The game bridge must be on **443**: the otclient browser build rewrites game
port 7172 to 443 (`src/client/protocolgame.cpp`). If `gameProtocolPort` is
anything other than 7172, the browser connects to that port unchanged.

The browser reuses the hostname it logged in with for the game connection
(the 7.92 character list can only carry an IPv4 address), so the TLS
certificate only needs that hostname.

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

- If the game connection fails (for example nothing listens on 443), the
  client stops redrawing instead of showing an error. Reload the page.
- The client logs "extended opcodes are not enabled". This is expected: it
  reports itself as a classic client for 7.80-7.92 so the server keeps to the
  standard protocol.
- websockify starts one process per connection; fine for testing, not for
  hundreds of players.
