import Locales from './locales'

let lang = Intl.DateTimeFormat().resolvedOptions().locale

lang = (lang === 'pt-BR' || lang === 'en-US')
  ? lang
  : 'en-US'

export const currentLang = lang
export const contraryLang = lang.includes('en') ? 'pt-BR' : 'en-US'

const locale = lang.split('-')[0].toUpperCase()

export default Locales[locale]