FROM node:24-alpine

WORKDIR /app
COPY . /app

ENV NODE_ENV=production
RUN yarn install --frozen-lockfile

CMD [ "yarn", "start" ]