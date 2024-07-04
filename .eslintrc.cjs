module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs','src'],//para tirar os errinhos (que são avisos), eu acrescento 'src', pra ele ignorar tudo que tiver dentro dessa pasta. 
  //quando eu quiser volte , eu tiro o src, e reinicio o vscode
  //em projetos maiores , é melhor não tirar
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
