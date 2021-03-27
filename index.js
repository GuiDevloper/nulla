#! /usr/bin/env node

const {
  showExit,
  commands,
  args,
  run,
  message
} = require('./modules');
const { add } = require('./add');

if (!Object.keys(commands).includes(args[0])) {
  showExit(message.unknown);
}

if (args[0] === 'add') {
  add(args);
}
run();
