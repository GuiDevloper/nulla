let lang = Intl.DateTimeFormat().resolvedOptions().locale;

lang = (lang === 'pt-BR' || lang === 'en-US')
  ? lang
  : 'en-US';

const message = ({
  'pt-BR': {
    unknown: 'Eita, digite um comando que eu conheça!',
    alreadyInstalled: 'Hm, este já foi instalado!'
  },
  'en-US': {
    unknown: 'Hey, type a command I know!',
    alreadyInstalled: 'Wait, already installed!'
  }
})[lang];

module.exports = message;