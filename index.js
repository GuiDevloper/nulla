#! /usr/bin/env node

const {
  showExit,
  commands,
  args,
  run,
  message
} = require('./src/modules');

if (args.includes('-v')) {
  const version = require('./package.json').version;
  showExit(message.version, version);
}

if (args[0] === 'help') {
  showExit(message.help);
}

if (args[0] === 'deploy') {
  const { deploy } = require('./src/deploy');
  return deploy(args);
}

if (args[0] === 'new-ci') {
  const { newCI } = require('./src/new-ci');
  return newCI(args);
}

if (!Object.keys(commands()).includes(args[0])) {
  showExit(message.unknown);
}

if (args[0] === 'add') {
  const { add } = require('./src/add');
  add(args);
}
run();
