module.exports = {
  env: { browser: true, es6: true, node: true },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'react/jsx-filename-extension': 1,
    'import/no-unresolved': 1,
    'import/extensions': 1,
    'no-unused-vars': 1,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
