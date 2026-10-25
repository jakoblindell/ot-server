# Sabrehaven game server. Built from the repository root:
#   docker build -t sabrehaven .
FROM ubuntu:24.04 AS build

ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential cmake \
        libboost-filesystem-dev libboost-iostreams-dev libboost-system-dev \
        libcrypto++-dev libgmp-dev libluajit-5.1-dev libmysqlclient-dev libpugixml-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /src
COPY CMakeLists.txt ./
COPY cmake ./cmake
COPY src ./src
RUN cmake -S . -B build -DCMAKE_BUILD_TYPE=Release \
    && cmake --build build -j"$(nproc)"

FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive
# git: the editable server files are a git repository (deploy/game-files.sh).
# The user has id 1000, like the website's container, which edits the same
# files.
RUN apt-get update && apt-get install -y --no-install-recommends \
        libboost-filesystem1.83.0 libboost-iostreams1.83.0 libboost-system1.83.0 \
        libcrypto++8t64 libgmp10 libluajit-5.1-2 libmysqlclient21 libpugixml1v5 tzdata git \
    && rm -rf /var/lib/apt/lists/* \
    && userdel --remove ubuntu \
    && useradd --uid 1000 --home /srv/sabrehaven sabrehaven

WORKDIR /srv/sabrehaven
COPY --from=build /src/build/tfs ./tfs
COPY key.pem ./
# The server's files as built: game-files.sh puts them in the game-files
# volume (merged with staff edits); the maps stay here, linked into it
COPY data ./image/data
COPY config.lua ./image/config.lua
RUN mkdir -p maps \
    && (cd image && find . -name '*.otbm' -exec sh -c 'mkdir -p "../maps/$(dirname "$1")" && mv "$1" "../maps/$1"' _ {} \;) \
    && mkdir -p /srv/game-files && chown sabrehaven /srv/game-files \
    && ln -s /srv/game-files/live/data data \
    && ln -s /srv/game-files/live/config.lua config.base.lua
# deploy/config.lua layers environment settings on top of config.base.lua
COPY deploy/config.lua ./config.lua
COPY deploy/run-server.sh deploy/game-files.sh ./

USER sabrehaven
EXPOSE 7171 7172
CMD ["./run-server.sh"]
