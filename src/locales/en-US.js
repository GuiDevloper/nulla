module.exports = {
  unknown: 'Ops, type a command I know!',
  alreadyInstalled: 'Wait, already installed!',
  version: 'Hey, take a look at my version:',
  help:
  `  Help.. I want somebody! Help.. ♪
  Ah, you are there, see how to call me:

  Usage: nulla [action] [flags]

  Actions:

  -v                        Shows my installed version

  new-ci vercel             Generates deploy automator file for Github
  new-ci heroku             The same as above, but for Heroku

  deploy vercel             Build & deploy project to Vercel (Vercel CLI required)
  deploy vercel --cd        Build project in Git to be used by own Vercel CI/CD

  See you later!`,
  ymlCreated: 'CI file to be pushed was generated in',
  deprecatedCmd: 'Deprecated command!'
}