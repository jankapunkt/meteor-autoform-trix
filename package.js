/* eslint-env meteor */

Package.describe({
  name: 'jkuester:autoform-trix',
  version: '2.1.0',
  // Brief, one-line summary of the package.
  summary: 'Get the Trix wysiwyg-editor as configurable AutoForm extension.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jankapunkt/meteor-autoform-trix.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6')
  api.use('ecmascript')
  api.use('aldeed:autoform@6.0.0 || 7.0.0')
  api.use('templating@1.4.2')
  api.use('reactive-dict')
  api.mainModule('main.js', 'client')
})
