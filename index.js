#! /usr/bin/env node

const {
  showExit,
  args,
  message
} = require('./src/modules');

if (args.includes('-v')) {
  const version = require('./package.json').version;
  showExit(message.version, version);
}

if (args[0] === 'help') {
  showExit(message.help);
}

if (args[0] === 'new-ci') {
  const { newCI } = require('./src/new-ci');
  return newCI(args);
}

throw new Error(message.deprecatedCmd);
