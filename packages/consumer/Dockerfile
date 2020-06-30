FROM node:12 as build

WORKDIR /build
COPY . /build

RUN npm i \
  && npm run build \
  && npm prune --production

FROM node:12-alpine

WORKDIR /app

COPY --from=build /build/dist /app/dist
COPY --from=build /build/node_modules /app/node_modules

CMD ["node", "dist/main.js"]
