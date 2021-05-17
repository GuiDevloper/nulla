#! /usr/bin/env node

const {
  showExit,
  commands,
  args,
  run,
  message
} = require('./src/modules');
const { add } = require('./src/add');

if (args.includes('-v')) {
  const version = require('./package.json').version;
  showExit(message.version, version);
}

if (args[0] === 'help') {
  showExit(message.help);
}

if (!Object.keys(commands()).includes(args[0])) {
  showExit(message.unknown);
}

if (args[0] === 'add') {
  add(args);
}
run();
