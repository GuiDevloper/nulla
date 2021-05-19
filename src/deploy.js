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
  const thisPath = (other) => path.join(process.cwd(), other || '');
  if (!fs.existsSync(myFile)) {
    const newDir = myFile.substring(0, myFile.lastIndexOf('/'));
    fs.mkdirSync(path.join('./', newDir), { recursive: true });
    fs.writeFileSync(myFile, '');
  }
  fs.copyFileSync(myPath(myFile), thisPath(myFile));
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

function yarnBuild() {
  runCLI('', Nulla.osCLI('yarn'), 'inherit');
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
  yarnBuild();
  prepareVercelFiles();

  if (isCD) {
    runCLI('-rf ./node_modules .gitignore _package.json', 'rm', 'inherit');
    [
      'add . -f',
      'config --global user.name "NullstackDeployer"',
      'config --global user.email "nullstack@deployer.ci"',
      'commit -m DeployVercel',
      'push -u origin vercel-deploy -f'
    ].forEach(cmd => runCLI(cmd, 'git', 'inherit'))
  } else {
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
}

Deploy.deploy = function(args) {
  if (args[1] === '--yml') {
    const ymlPath = '.github/workflows/main.yml';
    copyFile(ymlPath);
    Nulla.showExit(`${Nulla.message.ymlCreated} "${ymlPath}"`);
  }
  if (args[1] === 'vercel') return Deploy.vercel(args);
  Nulla.showExit(Nulla.message.unknown);
}

module.exports = Deploy;