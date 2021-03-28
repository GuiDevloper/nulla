let lang = Intl.DateTimeFormat().resolvedOptions().locale;

lang = (lang === 'pt-BR' || lang === 'en-US')
  ? lang
  : 'en-US';

const message = ({
  'pt-BR': {
    unknown: 'Eita, digite um comando que eu conheça!',
    alreadyInstalled: 'Hm, este já foi instalado!',
    version: 'Ei, veja minha versão:'
  },
  'en-US': {
    unknown: 'Ops, type a command I know!',
    alreadyInstalled: 'Wait, already installed!',
    version: 'Hey, take a look at my version:'
  }
})[lang];

module.exports = message;