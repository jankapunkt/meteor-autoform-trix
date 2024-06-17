/* eslint-env meteor */

Package.describe({
  name: 'jkuester:autoform-trix',
  version: '3.0.0-rc.0',
  // Brief, one-line summary of the package.
  summary: 'Get the Trix wysiwyg-editor as configurable AutoForm extension.',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jankapunkt/meteor-autoform-trix.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom(['1.6', '2.8.0', '3.0-rc.4'])
  api.use([
    'ecmascript',
    'reactive-dict',
    'templating@1.4.3 || 1.4.4-rc300.2',
    'aldeed:autoform@6.0.0 || 7.0.0 || 8.0.0-rc.2'
  ], 'client')
  api.mainModule('main.js', 'client')
})
