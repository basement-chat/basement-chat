module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  overrides: [
    {
      extends: [
        'airbnb-base',
        'airbnb-typescript/base',
        'plugin:@typescript-eslint/recommended',
      ],
      files: ['*.ts'],
      rules: {
        semi: ['error', 'never'],
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/semi': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      plugins: [
        '@typescript-eslint',
      ],
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    semi: ['error', 'never'],
    'import/no-extraneous-dependencies': 'off',
  },
}
