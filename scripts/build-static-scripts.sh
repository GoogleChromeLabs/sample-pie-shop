#!/bin/sh
if [ "$NODE_ENV" = "production" ]
then
CONFIG="webpack.prod.js"
else
CONFIG="webpack.dev.js"
fi

mkdir -p dist/static/js && ./node_modules/.bin/webpack --config $CONFIG
