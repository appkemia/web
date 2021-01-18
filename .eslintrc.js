module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['airbnb', 'prettier', 'prettier/react'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  // settings: {
  //   'import/resolver': {
  //     alias: {
  //       map: [['src', './src']],
  //     },
  //   },
  // },
  settings: {
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, 'src')],
      },
    },
  },
  rules: {
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.jsx', '.js'],
      },
    ],
    'import/prefer-default-export': 'off',
    'react/state-in-constructor': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'no-param-reassign': 'off',

    'no-shadow': 'off',
    'no-console': 'off',
    'no-var': 'error',
    quotes: ['warn', 'single'],
    camelcase: 'off',
    'no-extra-semi': 'warn',
    'no-mixed-spaces-and-tabs': 'warn',
    'no-debugger': 'warn',
    'no-multiple-empty-lines': 'warn',
    'block-scoped-var': 'warn',
    complexity: 'error',
    eqeqeq: 'error',
    semi: 'warn',
    'no-caller': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'warn',
    'no-multi-spaces': [
      'warn',
      {
        exceptions: {
          VariableDeclarator: true,
          Property: true,
          ImportDeclaration: true,
          BinaryExpression: true,
        },
      },
    ],
    'no-new-wrappers': 'error',
    'no-proto': 'error',
    'no-with': 'error',
    'no-sync': 'error',
    'prefer-const': 'warn',
    'prefer-spread': 'error',
    'prefer-rest-params': 'error',
    'prefer-template': 'error',
    'no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
      },
    ],
    'comma-spacing': 'error',
    'quote-props': ['error', 'consistent-as-needed'],
  },
};
