FROM node:17.4.0-alpine3.15 as BUILD_IMAGE

RUN mkdir /app
WORKDIR /app
COPY package*.json ./
RUN yarn --frozen-lockfile
COPY ./ .
RUN yarn build
RUN npm prune --production

FROM node:17.4.0-alpine3.15

WORKDIR /app
COPY --from=BUILD_IMAGE /app/package*.json ./
COPY --from=BUILD_IMAGE /app/build ./build
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/public ./public

EXPOSE 3000
ENTRYPOINT yarn start
