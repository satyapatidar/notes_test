/** @type {import('semantic-release').GlobalConfig} */
module.exports = {
  branches: ["main"],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: 'feat', release: 'minor' },
          { type: 'fix', release: 'patch' },
          { type: 'perf', release: 'patch' },
          { type: 'ux', release: 'patch' },
          { type: 'deps', release: 'patch' },
          { type: 'docs', release: false },
          { type: 'style', release: false },
          { type: 'breaking', release: 'major' },
        ],
        parserOpts: {
          noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES'],
        },
      },
    ],
    [
      '@semantic-release/release-notes-generator',
      {
        writerOpts: {
          groupBy: 'type',
          commitGroupsSort: 'title',
          commitGroupsMerge: true,
          transform: (commit) => {
            const map = {
              feat: 'Features',
              fix: 'Fixes',
              perf: 'Performance',
              ux: 'UX Improvements',
              deps: 'Dependency Updates',
              breaking: 'Breaking Changes',
              style: 'Code Style',
              docs: 'Documentation',
            };
            commit.groupTitle = map[commit.type] || commit.type;
            return commit;
          },
          groupTitleFormatter: (group) => group.groupTitle,
        },
      },
    ],
    [
      '@semantic-release/changelog',
      {
        changelogFile: 'CHANGELOG.md',
      },
    ],
    [
      './scripts/external-changelog-generator.js',
      {},
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/git',
      {
        assets: [
          'CHANGELOG.md',
          'package.json',
          'external-*.md',
        ],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    '@semantic-release/github',
  ],
};
