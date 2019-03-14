// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from 'meteor/tinytest'

// Import and rename a variable exported by autoform-trix.js.
import { name as packageName } from 'meteor/jkuester:autoform-trix'

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-trix - example', function (test) {
  test.equal(packageName, 'autoform-trix')
})
