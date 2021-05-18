const child = require('child_process');
const Deploy = {};
const Nulla = require('./modules');
const fs = require('fs');
const path = require('path');

function runCLI(args, cli, stdio = 'pipe') {
  const pawn = child.spawnSync(
    cli,
    args.split(' '),
    { encoding: 'utf8', stdio }
  );
  if (pawn.stderr) Nulla.showExit(pawn.stderr);
  return pawn;
}

function copyFile(myFile) {
  const myPath = (file) => path.join(__dirname, `/deployFiles/vercel/${file}`);
  fs.copyFileSync(myPath(myFile), path.join(process.cwd(), myFile));
}

function rmDir(dir) {
  try {
    fs.rmdirSync(dir, { recursive: true });
  } catch {}
}

Deploy.vercel = function() {
  runCLI('', Nulla.osCLI('yarn'), 'inherit');
  runCLI('build', Nulla.osCLI('yarn'), 'inherit');
  fs.renameSync('./package.json', './_package.json');
  try {
    fs.mkdirSync('./api');
  } catch {}
  ['api/nullstack.js', 'vercel.json'].forEach(copyFile);

  runCLI('--confirm --prod', Nulla.osCLI('vercel'), 'inherit');
  fs.renameSync('./_package.json', './package.json');

  rmDir('./.production');
  const apiFiles = fs.readdirSync('./api');
  if (apiFiles.length === 1) {
    rmDir('./api');
  } else {
    rmDir('./api/nullstack.js');
  }
  rmDir('./vercel.json');
}

Deploy.deploy = function(host) {
  if (host === 'vercel') return Deploy.vercel();
  Nulla.showExit(Nulla.message.unknown);
}

module.exports = Deploy;