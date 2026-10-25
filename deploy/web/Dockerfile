# Reverse proxy and web client. Built from the repository root (see
# deploy/docker-compose.yml) so it can pick up the 7.92 client assets.
# Caddy with rate limiting and Cloudflare's address ranges (for running
# behind Cloudflare); stock Caddy has neither
FROM caddy:2.8-builder AS caddy-build
RUN xcaddy build --with github.com/mholt/caddy-ratelimit --with github.com/WeidiDeng/caddy-cloudflare-ip

FROM caddy:2.8
COPY --from=caddy-build /usr/bin/caddy /usr/bin/caddy

# Browser build of otclient, published by the ot-client repository's CI
ARG CLIENT_URL=https://github.com/jakoblindell/ot-client/releases/download/web-client-792-latest/otclient-web.zip
ADD ${CLIENT_URL} /tmp/otclient-web.zip

# The client is served under /play/ (the website has the rest)
WORKDIR /srv/web/play
RUN unzip -q /tmp/otclient-web.zip -d /srv/web/play \
    && rm /tmp/otclient-web.zip \
    && sed -i 's|<script async src=otclient.js></script>|<script src=client-config.js></script><script src=things.js></script><script async src=otclient.js></script>|' otclient.html \
    && grep -q 'src=things.js' otclient.html \
    && ln -s otclient.html index.html

COPY deploy/web/things.js ./things.js
COPY deploy/web/client-config.js ./client-config.js
# Installing as an app: manifest, icons, service worker (deploy/web/app)
COPY deploy/web/app ./app
COPY deploy/web/sw.js ./sw.js
RUN sed -i 's|<title>Loading</title>|<title>Elderwood</title><link rel=manifest href=app/manifest.webmanifest><link rel=icon href=app/icon-192.png><link rel=apple-touch-icon href=app/apple-touch-icon.png><meta name=theme-color content=#000000><meta name=mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-capable content=yes><meta name=apple-mobile-web-app-status-bar-style content=black><meta name=apple-mobile-web-app-title content=Elderwood><script src=app/app.js></script>|' otclient.html \
    && grep -q 'app/manifest.webmanifest' otclient.html
COPY SabrehavenOTClient/data/things/792 ./things/792
COPY deploy/web/Caddyfile /etc/caddy/Caddyfile

# Compressed copies of the big files, served by Caddy's precompressed file
# server (its on-the-fly compression skips them: they are not text). About
# 26 MB instead of 52 MB for a first visit.
RUN for f in otclient.data otclient.wasm otclient.js things/792/Tibia.spr things/792/Tibia.dat; do \
        gzip -9 -c "$f" > "$f.gz"; \
    done
