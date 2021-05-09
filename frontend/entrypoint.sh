#!/bin/bash

yarn install
yarn build

if [ $NODE_ENV == production ]
then
  yarn start
else
  tail -f /dev/null
fi