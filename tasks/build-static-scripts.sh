#!/bin/sh
if [ "$NODE_ENV" = "production" ]
then
CONFIG="webpack.prod.js"
else
CONFIG="webpack.dev.js"
fi

mkdir -p dist/static/js && ./node_modules/.bin/webpack --config $CONFIG

# temporary hack!
INFILE=src/client/js/lazy-img.js
OUTDIR=dist/static/js
OUTFILE=$OUTDIR/lazy-img.js
cp $INFILE $OUTFILE
