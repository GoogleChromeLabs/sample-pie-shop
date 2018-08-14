#!/bin/sh
if [ "$NODE_ENV" = "production" ]
then
CONFIG="webpack.prod.js"
else
CONFIG="webpack.dev.js"
fi

INDIR=src/client/
OUTDIR=dist/static

mkdir -p $OUTDIR &&
cp -v $INDIR/favicon.ico $OUTDIR &&
cp -v $INDIR/manifest.json $OUTDIR &&
cp -Rv $INDIR/images $OUTDIR &&
cp -Rv $INDIR/js $OUTDIR &&
./node_modules/.bin/webpack --config $CONFIG
