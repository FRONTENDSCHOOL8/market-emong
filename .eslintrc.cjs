module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 선언한 변수를 사용하지 않았을 때 warn
    'no-unused-vars': 'warn',
    // 도달하지 않는 코드 사용 시 에러 표시
    // ex) functuion a() { return 1; return 2;}
    // return 2; 에서 에러 표시
    'no-unreachable': 'error',
    // 블록의 중첩 횟수 제어하기
    'max-depth': ['error', { max: 2 }],
  },
};
