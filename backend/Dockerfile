FROM node

WORKDIR /backend
COPY . /backend

EXPOSE 3000

RUN yarn install

ENTRYPOINT ["/bin/bash", "entrypoint.sh"]