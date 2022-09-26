module.exports = {
  extends: 'stylelint-config-recommended-scss',
  ignoreFiles: ['node_modules/*'],
  defaultSeverity: 'error',
  overrides: [{
    files: ['**/*.svelte'],
    customSyntax: 'postcss-html'
  }],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ]
  }
};
