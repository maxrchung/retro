FROM node

WORKDIR /app
COPY . /app

EXPOSE 3000

RUN yarn install
RUN yarn build

ENTRYPOINT ["/bin/bash", "entrypoint.sh"]