const message = require('./messages');
const { spawn } = require('child_process');
const args = process.argv.slice(2);
const startCommand = /^win/.test(process.platform) ? 'npx.cmd' : 'npx';

function showExit(...message) {
  console.log(...message);
  process.exit(0);
}

const webpackCommand = 'webpack --config node_modules/nullstack/webpack.config.js';
const commands = {
  start: webpackCommand + ' --mode=development --watch',
  build: webpackCommand + ' --mode=production',
  add: `${args.includes('-n') ? 'npm install' : 'yarn add'} ${args[1]} -D`
};

function run() {
  const pawn = spawn(
    startCommand,
    commands[args[0]].split(' '),
    { stdio: 'inherit' }
  );
  pawn.on('error', showExit);
  pawn.on('close', () => process.exit(0));
}

module.exports = {
  showExit,
  commands,
  args,
  run,
  message
};
