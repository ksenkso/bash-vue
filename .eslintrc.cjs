module.exports = {
  root: true,
  globals: {
    definePageMeta: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
  ],
  plugins: ['simple-import-sort'],
  env: {
    'vue/setup-compiler-macros': true,
    node: true,
    browser: true,
  },
  rules: {
    quotes: ['warn', 'single'],
    'no-undef': 'off',
    'vue/require-default-prop': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'simple-import-sort/imports': [2, {
      groups: [
        [
          '^vue',
          '^@vueuse',
          '^\\u0000~*[a-zA-Z]',
          '^~*[a-zA-Z]',
        ],
        ['^~\/components'],
        ['^~'],
      ],
    }],
  },
};
