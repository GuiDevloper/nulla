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

function createDeployBranch() {
  runCLI('branch vercel-deploy -f', Nulla.osCLI('git'), 'inherit');
  runCLI('checkout vercel-deploy', Nulla.osCLI('git'), 'inherit');
}

function yarnBuild(isCD) {
  runCLI(isCD ? 'ci' : '', Nulla.osCLI('yarn'), 'inherit');
  runCLI('build', Nulla.osCLI('yarn'), 'inherit');
}

function prepareVercelFiles() {
  fs.renameSync('./package.json', './_package.json');
  try {
    fs.mkdirSync('./api');
  } catch {}
  ['api/nullstack.js', 'vercel.json'].forEach(copyFile);
}

Deploy.vercel = function(args) {
  const isCD = args[2] === '--cd';
  if (isCD) createDeployBranch();
  yarnBuild(isCD);
  prepareVercelFiles();

  if (isCD) {
    runCLI('-rf ./node_modules .gitignore package-lock.json', 'rm', 'inherit');
    [
      'add . -f',
      'config --global user.name "Nullstack Deployer"',
      'config --global user.email "nullstack@deployer.ci"',
      'commit -m "Deploy Vercel"',
      'push -u origin vercel-deploy -f'
    ].forEach(cmd => runCLI(cmd, 'git', 'inherit'))
  } else {
    runCLI('--confirm --prod', Nulla.osCLI('vercel'), 'inherit');
    rmDir('./.production');
    const apiFiles = fs.readdirSync('./api');
    if (apiFiles.length === 1) {
      rmDir('./api');
    } else {
      rmDir('./api/nullstack.js');
    }
    rmDir('./vercel.json');
  }
  fs.renameSync('./_package.json', './package.json');
}

Deploy.deploy = function(args) {
  if (args[1] === 'vercel') return Deploy.vercel(args);
  Nulla.showExit(Nulla.message.unknown);
}

module.exports = Deploy;