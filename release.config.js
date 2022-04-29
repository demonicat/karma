module.exports = {
  branches: [{ name: "main" }],
  plugins: [
    [
      "@google/semantic-release-replace-plugin",
      {
        replacements: [
          {
            files: ["app.config.js"],
            from: "version: '.*'", // eslint-disable-line
            to: "version: '${nextRelease.version}'", // eslint-disable-line
          },
          {
            files: ["app.config.js"],
            from: "buildNumber: '.*'", // eslint-disable-line
            to: "buildNumber: '${nextRelease.version}'", // eslint-disable-line
          },
          {
            files: ["app.config.js"],
            from: `versionCode: [^,]*`, // eslint-disable-line
            to: (match) => `versionCode: ${parseInt(match.split(':')[1].trim()) + 1}`, // eslint-disable-line
          },
        ],
      },
    ],
    "@semantic-release/changelog",
    "@semantic-release/npm",
    {
      path: "@semantic-release/git",
      assets: ["app.config.js", "yarn.lock", "CHANGELOG.md"],
      message: "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
    },
  ],
};
