// @ts-check
const fs = require('fs');
const path = require('path');
const Nulla = {};
Nulla.message = require('./messages');
Nulla.args = Nulla.args || process.argv.slice(2);

Nulla.showExit = function(...message) {
  console.log(...message);
  process.exit(0);
}

Nulla.osCLI = (cli) => /^win/.test(process.platform) ? `${cli}.cmd` : cli;

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
