const child = require('child_process');
const fs = require('fs');
const path = require('path');
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

Nulla.osCLI = (cli) => /^win/.test(process.platform) ? `${cli}.cmd` : cli;

Nulla.run = function() {
  const startCommand = Nulla.osCLI('npx');
  const pawn = child.spawn(
    startCommand,
    Nulla.commands()[Nulla.args[0]].split(' '),
    { stdio: 'inherit' }
  );
  pawn.on('error', Nulla.showExit);
  pawn.on('close', () => process.exit(0));
}

Nulla.copyFile = function(myFile, host) {
  const myPath = (file) => path.join(__dirname, `/deployFiles/${host}/${file}`);
  const thisPath = (other) => path.join(process.cwd(), other || '');

  if (!fs.existsSync(myFile)) {
    const newDir = myFile.substring(0, myFile.lastIndexOf('/'));
    fs.mkdirSync(path.join('./', newDir), { recursive: true });
    fs.writeFileSync(myFile, '');
  }
  fs.copyFileSync(myPath(myFile), thisPath(myFile));
}

module.exports = Nulla;
