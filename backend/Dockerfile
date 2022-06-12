FROM node:17.3.0-alpine3.15

WORKDIR /app
COPY . /app

ENV NODE_ENV=production
RUN yarn install --frozen-lockfile

CMD [ "yarn", "start" ]