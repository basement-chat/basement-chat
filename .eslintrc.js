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
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/strict',
      ],
      files: ['*.ts'],
      rules: {
        semi: ['error', 'never'],
        'no-void': ['error', { allowAsStatement: true }],
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
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
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
  },
}
