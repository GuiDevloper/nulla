const Nulla = require('./modules');
const CI = {};

const fs = require('fs');
function prepareCIFiles(host, files) {
  if (host === 'vercel') {
    try {
      fs.mkdirSync('./api');
    } catch {}
  }
  files.forEach(file => {
    Nulla.copyFile(file, host);
  });
}

CI.newCI = function(args) {
  const supported = {
    vercel: ['api/nullstack.js', 'vercel.json'],
    heroku: ['Procfile']
  };
  try {
    const CIPath = supported[args[1]];
    if (CIPath) {
      prepareCIFiles(args[1], CIPath);
      Nulla.showExit(`${Nulla.message.ciCreated} "${CIPath.join(', ')}"`);
    } else {
      Nulla.showExit(Nulla.message.unknown);
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = CI;