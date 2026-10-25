# The website (SvelteKit, Node). Built from the site directory.
FROM node:22-bookworm-slim AS build
WORKDIR /site
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-bookworm-slim
WORKDIR /site
ENV NODE_ENV=production PORT=3000
COPY --from=build /site/build ./build
COPY --from=build /site/node_modules ./node_modules
COPY package.json ./
COPY migrations ./migrations
USER node
EXPOSE 3000
CMD ["node", "build"]
