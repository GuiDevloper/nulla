let lang = Intl.DateTimeFormat().resolvedOptions().locale;

lang = (lang === 'pt-BR' || lang === 'en-US')
  ? lang
  : 'en-US';

module.exports = require(`./locales/${lang}`);