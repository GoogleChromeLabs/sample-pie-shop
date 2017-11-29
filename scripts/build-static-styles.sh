#!/bin/sh
SASS=node_modules/.bin/node-sass
OUTDIR=dist/static/styles
OUTFILE=$OUTDIR/style.css
INFILE=src/client/styles/style.scss

if [ "$NODE_ENV" = "production" ]
then
OPTIONS="--output-style=compressed"
else
OPTIONS="--source-map=true"
fi

mkdir -p $OUTDIR &&
$SASS -o $OUTDIR $OPTIONS $INFILE > $OUTFILE
