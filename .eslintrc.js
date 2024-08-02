module.exports = {
  root: true,
  extends: [
    '@react-native',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        arrowParens: 'avoid',
        bracketSameLine: true,
        bracketSpacing: false,
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 80,
        tabWidth: 2,
        semi: true,
      },
    ],
    'react/self-closing-comp': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-native/no-inline-styles': 'warn',
    'no-multi-spaces': 'off', // 禁用多重空格检查
    'space-in-parens': 'off', // 禁用括号内空格检查
    'no-multiple-empty-lines': 'off', // 允许多行空行
    'padded-blocks': 'off', // 允许块内填充
    'key-spacing': 'off', // 禁用键值对中的空格检查
    'comma-dangle': 'off', // 禁用拖尾逗号检查
    'object-curly-spacing': 'off', // 禁用花括号内的空格检查
    'array-bracket-spacing': 'off', // 禁用数组括号内的空格检查
    'computed-property-spacing': 'off', // 禁用计算属性括号内的空格检查
  },
};
