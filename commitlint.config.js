module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'perf',
        'ux',
        'deps',
        'docs',
        'style',
        'breaking',
      ],
    ],
  },
};
