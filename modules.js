const child = require('child_process');
const Nulla = {};
Nulla.message = require('./messages');
Nulla.args = Nulla.args || process.argv.slice(2);

Nulla.showExit = function(...message) {
  console.log(...message);
  process.exit(0);
}

const webpackCommand = 'webpack --config node_modules/nullstack/webpack.config.js';
Nulla.commands = () => {
  const { args } = Nulla;
  return {
    start: webpackCommand + ' --mode=development --watch',
    build: webpackCommand + ' --mode=production',
    add: `${args.includes('-n') ? 'npm install' : 'yarn add'} ${args[1]} -D`
  }
};

Nulla.run = function() {
  const startCommand = /^win/.test(process.platform) ? 'npx.cmd' : 'npx';
  const pawn = child.spawn(
    startCommand,
    Nulla.commands()[Nulla.args[0]].split(' '),
    { stdio: 'inherit' }
  );
  pawn.on('error', Nulla.showExit);
  pawn.on('close', () => process.exit(0));
}

module.exports = Nulla;
