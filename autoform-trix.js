/* global Trix AutoForm */
import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'
import { updateLang, createEventHook } from './autoform-helpers'
import './autoform-config'

Template.afTrix.onCreated(function () {
  const instance = this
  instance.state = new ReactiveDict()
  instance.state.set('dataSchemaKey', instance.data.atts[ 'data-schema-key' ])

  instance.autorun(() => {
    const data = Template.currentData()
    if (data.atts.config) {
      Trix.config = Object.assign({}, Trix.config, data.atts.config)
    }
  })
})

Template.afTrix.onRendered(function () {
  const instance = this
  instance.autorun(() => {
    const data = Template.currentData()
    if (data.atts.lang) {
      updateLang(data.atts.lang, instance)
    }
  })
})

Template.afTrix.helpers({
  dataSchemaKey () {
    return Template.instance().state.get('dataSchemaKey')
  }
})

// camelCase mapped events
const eventMap = {
  'trix-before-initialize': 'beforeInitialize',
  'trix-initialize': 'initialize',
  'trix-change': 'change',
  'trix-selection-change': 'selectionChange',
  'trix-focus': 'focus',
  'trix-blur': 'blur',
  'trix-file-accept': 'fileAccept',
  'trix-attachment-add': 'attachmentAdd',
  'trix-attachment-remove': 'attachmentRemove'
}

// generate a hook for each of the trix events
// based on the event mapping
const events = {}
Object.keys(eventMap).forEach(eventKey => {
  events[ eventKey ] = createEventHook(eventMap[ eventKey ])
})

// attach events to the template
Template.afTrix.events(events)

// attach names of the callback functions
// the a property of the global AutoForm
// so that they are easily accessible for dev's
AutoForm.afTrixEvents = Object.assign({}, eventMap)
