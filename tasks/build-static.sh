#!/bin/sh
if [ "$NODE_ENV" = "production" ]
then
CONFIG="webpack.prod.js"
else
CONFIG="webpack.dev.js"
fi

INDIR=src/client/*
OUTDIR=dist/static

mkdir -p $OUTDIR &&
cp -Rv $INDIR $OUTDIR &&
./node_modules/.bin/webpack --config $CONFIG
