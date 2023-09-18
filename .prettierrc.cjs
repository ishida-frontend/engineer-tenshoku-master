module.exports = {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 80,
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
}
