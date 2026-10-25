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
RUN apt-get update && apt-get install -y --no-install-recommends \
        libboost-filesystem1.83.0 libboost-iostreams1.83.0 libboost-system1.83.0 \
        libcrypto++8t64 libgmp10 libluajit-5.1-2 libmysqlclient21 libpugixml1v5 \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --system --home /srv/sabrehaven sabrehaven

WORKDIR /srv/sabrehaven
COPY --from=build /src/build/tfs ./tfs
COPY data ./data
COPY key.pem config.lua ./
# config.lua stays as the base; deploy/config.lua layers environment settings on top
RUN mv config.lua config.base.lua
COPY deploy/config.lua ./config.lua
COPY deploy/run-server.sh ./run-server.sh

USER sabrehaven
EXPOSE 7171 7172
CMD ["./run-server.sh"]
