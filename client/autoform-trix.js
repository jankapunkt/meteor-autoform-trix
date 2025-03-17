/* global Trix AutoForm */
import { Template } from 'meteor/templating'
import { Random } from 'meteor/random'
import { ReactiveDict } from 'meteor/reactive-dict'
import { updateLang, createEventHook } from './autoform-helpers'
import './autoform-trix.css'
import './autoform-trix.html'

AutoForm.addInputType('trix', {
  template: 'afTrix',
  valueOut () {
    return this.val()
  },
  valueIn (initialValue) {
    return initialValue
  }
})

Template.afTrix.onCreated(function () {
  const instance = this
  instance.id = Random.id(8)
  instance.state = new ReactiveDict()
  instance.state.set('dataSchemaKey', instance.data.atts['data-schema-key'])
  instance.autorun(() => {
    const data = Template.currentData()

    if (data.atts.config) {
      Object.assign(Trix.config, data.atts.config)
    }

    if (data.atts.lang) {
      Object.assign(Trix.config.lang, data.atts.lang)
    }

    // update schema key, if needed
    const dsk = data.atts['data-schema-key']
    if (dsk && instance.state.get('dataSchemaKey') !== dsk) {
      instance.state.set('dataSchemaKey', dsk)
    }
  })
})

Template.afTrix.onRendered(function () {
  const instance = this
  if (instance.data.value) {
    const dsk = instance.state.get('dataSchemaKey')
    let target = instance.$(`#afTrixInput-${dsk}`)

    // XXX: in some edge cases it will not find the element by id
    // for example when being part of an object in array
    if (!target.get(0)) {
      target = instance.$(`[data-instance="${instance.id}"]`)
    }

    // XXX: if we still have not found anything,
    // we throw explicitly to make sure, devs
    // used the correct arguments
    if (!target.get(0)) {
      throw new Error(`No input field found for data-schema-key "${dsk}" or instance id "${instance.id}"`)
    }

    target.prop('value', instance.data.value)
  }
  instance.state.set('loadComplete', true)
  instance.autorun(() => {
    const data = Template.currentData()

    if (data.atts.attachments === false) {
      setTimeout(() => {
        $('.trix-button-group--file-tools').addClass('d-none')
      }, 300)
    }
  })
})

Template.afTrix.helpers({
  dataSchemaKey () {
    return Template.instance().state.get('dataSchemaKey')
  },
  loadComplete () {
    return Template.instance().state.get('loadComplete')
  },
  instanceId () {
    return Template.instance().id
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
  events[eventKey] = createEventHook(eventMap[eventKey])
})

// attach events to the template
Template.afTrix.events(events)

// attach names of the callback functions
// the a property of the global AutoForm
// so that they are easily accessible for dev's
AutoForm.afTrixEvents = Object.assign({}, eventMap)
