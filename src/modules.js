const child = require('child_process');
const fs = require('fs');
const path = require('path');
const Nulla = {};
Nulla.message = require('./messages');
Nulla.args = Nulla.args || process.argv.slice(2);

Nulla.getNullVersion = function() {
  const pkg = require(path.join(process.cwd(), 'package.json'));
  let nullVersion = pkg.devDependencies.nullstack || '';
  nullVersion = nullVersion.replace(/[^0-9.]/g, '').split('.');

  if (nullVersion.length !== 3 || isNaN(nullVersion[1])) {
    nullVersion = ['0', '11', '2'];
  }
  return nullVersion;
}

Nulla.showExit = function(...message) {
  console.log(...message);
  process.exit(0);
}

function npxCommand() {
  const webpack = 'webpack --config node_modules/nullstack/webpack.config.js';
  const nullVersion = Nulla.getNullVersion()[1];
  if (parseInt(nullVersion) > 10) {
    return {
      start: 'nullstack start',
      build: `nullstack build ${Nulla.args.slice(1).join(' ')}`
    }
  } else {
    return {
      start: webpack + ' --mode=development --watch',
      build: webpack + ' --mode=production',
    }
  }
}

Nulla.commands = () => {
  const { args } = Nulla;
  const cmds = npxCommand();
  return {
    ...cmds,
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
