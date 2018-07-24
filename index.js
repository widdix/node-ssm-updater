#!/usr/bin/env node

'use strict';

require('./cli.js').run(process.argv.splice(2))
  .then((data) => {
    console.info(data);
    process.nextTick(() => process.exit(0));
  })
  .catch(err => {
    console.error(`unexpected error ${process.argv.join(' ')}`, err);
    process.nextTick(() => process.exit(1));
  });
