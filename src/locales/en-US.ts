import i18nTemplate from './template/en-US'

export default {
  unknown: 'Ops, type a command I know!',
  alreadyInstalled: 'Wait, already installed!',
  version: 'Hey, take a look at my version:',
  help:
  `  Help.. I want somebody! Help.. ♪
  Ah, you are there, see how to call me:

  Usage: nulla [action] [flags]

  Actions:

  -v                        Shows my installed version

  new-ci vercel             Generates deploy files for Vercel
  new-ci heroku             The same as above, but for Heroku

  See you later!`,
  ciCreated: 'CI file was generated in',
  deprecatedCmd: 'Deprecated command!',
  i18nTemplate
}