# Reverse proxy and web client. Built from the repository root (see
# deploy/docker-compose.yml) so it can pick up the 7.92 client assets.
FROM caddy:2.8

# Browser build of otclient, published by the ot-client repository's CI
ARG CLIENT_URL=https://github.com/jakoblindell/ot-client/releases/download/web-client-792-latest/otclient-web.zip
ADD ${CLIENT_URL} /tmp/otclient-web.zip

WORKDIR /srv/web
RUN unzip -q /tmp/otclient-web.zip -d /srv/web \
    && rm /tmp/otclient-web.zip \
    && sed -i 's|<script async src=otclient.js></script>|<script src=client-config.js></script><script src=things.js></script><script async src=otclient.js></script>|' otclient.html \
    && grep -q 'src=things.js' otclient.html \
    && ln -s otclient.html index.html

COPY deploy/web/things.js ./things.js
COPY deploy/web/client-config.js ./client-config.js
COPY SabrehavenOTClient/data/things/792 ./things/792
COPY deploy/web/Caddyfile /etc/caddy/Caddyfile
