FROM node:12.18.1 as build

WORKDIR /build
COPY . /build

RUN npm i \
  && npm run build \
  && npm prune --production

FROM node:12.18.1-alpine

WORKDIR /app

COPY --from=build /build/dist /app/dist
COPY --from=build /build/node_modules /app/node_modules
COPY --from=build /build/.env /app/.env

EXPOSE 3000

CMD ["node", "dist/main.js"]
