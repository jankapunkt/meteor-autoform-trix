/* global Trix $ */

export const updateLang = function updateLang (newLang, templateInstance) {
  Object.keys(Trix.config.lang).forEach(key => {
    const value = Trix.config.lang[ key ]
    const selector = `button[title='${value}'], input[value='${value}'], input[placeholder='${value}']`
    $(selector).each((index, element) => {
      const newValue = newLang[key]
      if (element.hasAttribute('title')) {
        element.setAttribute('title', newValue)
      }
      if (element.hasAttribute('value')) {
        element.setAttribute('value', newValue)
      }
      if (element.hasAttribute('placeholder')) {
        element.setAttribute('placeholder', newValue)
      }
      if (element.textContent) {
        element.textContent = newValue
      }
    })
  })

  Trix.config.lang = newLang
}

// generator fct for the hooks
export const createEventHook = function createEventHook (eventName) {
  return function afTrixEventHook (event, templateInstance) {
    const { events } = templateInstance.data.atts
    const eventDef = events && events[eventName]

    // allow clients to block events
    if (eventDef === false) {
      return event.preventDefault()
    }

    if (eventDef) {
      events[ eventName ](event, templateInstance)
    }
  }
}
