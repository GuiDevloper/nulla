#! /usr/bin/env node

const { spawn } = require('child_process');
const message = require('./messages');

const args = process.argv.slice(2);
const commands = {
  start: 'webpack --config node_modules/nullstack/webpack.config.js --mode=development --watch',
  build: 'webpack --config node_modules/nullstack/webpack.config.js --mode=production'
}
const startCommand = /^win/.test(process.platform) ? 'npx.cmd' : 'npx';

if (Object.keys(commands).includes(args[0])) {
  console.log('npx ' + commands[args[0]]);
} else {
  console.log(message);
  process.exit(0);
}

const d1 = new Date().getTime();
const pawn = spawn(
  startCommand,
  commands[args[0]].split(' '),
  { stdio: 'inherit' }
);

pawn.on('error', (err) => {
  console.log(err);
  process.exit(0);
});

pawn.on('close', () => {
  if (args[0] === 'build') {
    const d2 = new Date().getTime();
    const duration = ((d2 - d1) / 1000).toFixed(2) + 's'
    console.log('Done in', duration);
  }
  process.exit(0);
});