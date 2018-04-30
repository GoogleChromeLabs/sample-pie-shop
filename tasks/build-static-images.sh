#!/bin/sh

# Copy images.

INDIR=src/client/images
OUTDIR=dist/static

mkdir -p $OUTDIR
cp -R $INDIR $OUTDIR
