FROM alpine:3.16
LABEL AUTHOR="Carlos Alberto Castaño <calbertts@gmail.com>"

RUN apk update && apk add --no-cache \
  curl \
  nodejs \
  npm

RUN addgroup -S node && adduser -S node -G node
USER node

RUN mkdir /home/node/code
WORKDIR /home/node/code

COPY --chown=node:node package-lock.json package.json ./
COPY --chown=node:node ./pages ./pages
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./.env.production ./.env.production

RUN rm -rf .next \
    npm i \
    npm run build

COPY --chown=node:node ./.next ./.next

EXPOSE 8080/tcp

ENV PORT=3002
ENV NODE_ENV=production

CMD ["npm", "start"]

