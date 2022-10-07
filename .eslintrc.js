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
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        'no-void': ['error', { allowAsStatement: true }],
        '@typescript-eslint/explicit-function-return-type': ['error', {
          allowTypedFunctionExpressions: false,
        }],
        '@typescript-eslint/explicit-member-accessibility': 'error',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'off',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/typedef': ['error', {
          arrayDestructuring: true,
          arrowParameter: true,
          memberVariableDeclaration: true,
          objectDestructuring: true,
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          variableDeclarationIgnoreFunction: true,
        }],
        '@typescript-eslint/semi': 'off',
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
  },
}
