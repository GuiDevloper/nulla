import { showExit, copyFile, messages } from './modules'
import fs from 'fs'
import { Argument } from 'commander'

function prepareCIFiles(host, files) {
  if (host === 'vercel') {
    try {
      fs.mkdirSync('./api')
    } catch {}
  }
  files.forEach(file =>  copyFile(file, host))
}

export function newCI(host) {
  const supported = {
    vercel: ['api/nullstack.js', 'vercel.json'],
    heroku: ['Procfile']
  }
  try {
    const CIPath = supported[host]
    if (CIPath) {
      prepareCIFiles(host, CIPath)
      showExit(`${messages.ciCreated} "${CIPath.join(', ')}"`)
    } else {
      showExit(messages.unknown)
    }
  } catch (e) {
    console.log(e)
  }
}

export default (program) => {
  const hostChoices = ['vercel', 'heroku']
  program
    .command('new-ci')
    .description('Generates deploy files')
    .addArgument(
      new Argument('<host>', 'Host to generate files to').choices(hostChoices)
    )
    .action(newCI)
}
