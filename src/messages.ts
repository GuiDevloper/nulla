import Locales from './locales'

let lang = Intl.DateTimeFormat().resolvedOptions().locale

lang = (lang === 'pt-BR' || lang === 'en-US')
  ? lang
  : 'en-US'

lang = lang.split('-')[0].toUpperCase()

export default Locales[lang]