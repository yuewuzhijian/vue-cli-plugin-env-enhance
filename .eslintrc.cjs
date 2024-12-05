/* eslint-env node */
module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'prettier',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    projectService: true,
    tsconfigRootDir: __dirname,
  },
  root: true,
  overrides: [
    {
      files: ['*.js', '*.cjs', '*.mjs'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/consistent-type-imports': 'error',
  },
}
