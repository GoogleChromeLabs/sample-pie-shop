#!/bin/sh
if [ "$NODE_ENV" = "production" ]
then
CONFIG="webpack.prod.js"
else
CONFIG="webpack.dev.js"
fi

INDIR=src/client/js
OUTDIR=dist/static

mkdir -p dist/static/js && ./node_modules/.bin/webpack --config $CONFIG
cp -R $INDIR $OUTDIR
