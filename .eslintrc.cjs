module.exports = {
    extends: [
        'prettier',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: ['@typescript-eslint', 'prettier'],
    root: true,
};