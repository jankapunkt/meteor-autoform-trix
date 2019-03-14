/* global AutoForm */

AutoForm.addInputType('trix', {
  template: 'afTrix',
  valueOut () {
    return this.val()
  },
  valueIn (initialValue) {
    return initialValue
  }
})
