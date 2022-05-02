module.exports = {
  unknown: 'Eita, digite um comando que eu conheça!',
  alreadyInstalled: 'Hm, este já foi instalado!',
  version: 'Ei, veja minha versão:',
  help:
  `  Help.. I want somebody! Help.. ♪
  Ah, você está aí, veja como me chamar:

  Uso: nulla [action] [flags]

  Actions:

  -v                        Mostra minha versão instalada
  add <pluginable-name>     Instala e adiciona plugin de elemento ao index.js usando Yarn
  add <pluginable-name> -n  O mesmo que acima, mas usando 'npm install'

  new-ci vercel             Gera arquivo automatizador de deploy para Github
  new-ci heroku             O mesmo que acima, mas para Heroku

  deploy vercel             Constroi & deploy projeto pra Vercel (necessita Vercel CLI)
  deploy vercel --cd        Constroi projeto no Git para uso do CI/CD próprio da Vercel

  Te vejo depois!`,
  ymlCreated: 'Arquivo de CI a ser comitado foi gerado em',
  deprecatedCmd: 'Comando obsoleto!'
}