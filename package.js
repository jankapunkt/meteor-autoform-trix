/* eslint-env meteor */

Package.describe({
  name: 'jkuester:autoform-trix',
  version: '1.0.0',
  // Brief, one-line summary of the package.
  summary: 'Providing basecamp/trix for AutoForm',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6')
  api.use('ecmascript')
  api.use('aldeed:autoform@6.0.0')
  api.use('templating@1.3.2')
  api.use('random')
  api.use('tracker')
  api.use('reactive-dict')
  api.addFiles([
    'autoform-trix.html',
    'autoform-trix.js',
    'autoform-trix.css',
    'autoform-config.js'
  ], 'client')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('jkuester:autoform-trix')
  api.mainModule('autoform-trix-tests.js')
})
