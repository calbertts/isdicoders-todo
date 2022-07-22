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
COPY --chown=node:node ./src ./src
COPY --chown=node:node ./tsconfig.json ./

RUN npm i \
    npm run compile

ENV PORT=80
ENV NODE_ENV=production

CMD ["node", "build/src/framework/Main.js"]
