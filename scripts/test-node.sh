#!/bin/sh
# TODO: add shared tests once we have them.
TESTS="test/server/**/*.test.js"
REQUIRES=test/server/requires.js
MOCHA=node_modules/.bin/mocha

$MOCHA -r $REQUIRES $TESTS
