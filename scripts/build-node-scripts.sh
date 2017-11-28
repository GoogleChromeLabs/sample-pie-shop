#!/bin/sh
OUTDIR=$PWD/dist/node
BABEL=$PWD/node_modules/.bin/babel

mkdir -p $OUTDIR/server/js &&
mkdir -p $OUTDIR/shared/js &&
mkdir -p $OUTDIR/data &&

cp -R data/* $OUTDIR/data &&

if [ "$NODE_ENV" = "production" ]
then
OPTIONS="--minified --compact=true"
else
OPTIONS="-s"
fi

# Change into src directory to pick up server Babel config.
cd src &&
$BABEL $OPTIONS --out-dir=$OUTDIR/server/js server/js &&
$BABEL $OPTIONS --out-dir=$OUTDIR/shared/js shared/js
