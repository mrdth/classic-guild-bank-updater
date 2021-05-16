module.exports = {
  parser: '@typescript-eslint/parser',
  root: true,
  env: {
    commonjs: true,
    es2021: true,
    'jest/globals': true,
    node: true
  },
  extends: [
    'standard',
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 12
  },
  rules: {
    semi: [2, 'always']
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]

};
