FROM node

WORKDIR /backend
COPY . /backend

EXPOSE 3000

RUN yarn install
RUN yarn build

ENTRYPOINT ["/bin/bash", "entrypoint.sh"]