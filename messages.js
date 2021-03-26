let lang = Intl.DateTimeFormat().resolvedOptions().locale;

lang = (lang === 'pt-BR' || lang === 'en-US')
  ? lang
  : 'en-US';

const message = ({
  'pt-BR': 'Eita, digite um comando que eu conheça!',
  'en-US': 'Hey, type a command I know!'
})[lang];

module.exports = message;