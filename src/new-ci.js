const Nulla = require('./modules');
const CI = {};

CI.newCI = function(args) {
  const supported = {
    vercel: '.github/workflows/main.yml',
    heroku: 'Procfile'
  };
  const CIPath = supported[args[1]];
  if (CIPath) {
    Nulla.copyFile(CIPath, args[1]);
    Nulla.showExit(`${Nulla.message.ymlCreated} "${CIPath}"`);
  } else {
    Nulla.showExit(Nulla.message.unknown);
  }
}

module.exports = CI;