module.exports = {
  extends: 'plugin:nullstack/recommended',
  rules: {
    'nullstack/prettier': [
      'warn',
      {
        // More options at https://prettier.io/docs/en/options
        trailingComma: 'all',
        tabWidth: 2,
        semi: false,
        singleQuote: true,
        printWidth: 80,
      },
      {
        usePrettierrc: false,
      },
    ],
  },
}
