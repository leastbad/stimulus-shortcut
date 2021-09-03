import { Controller } from 'stimulus'
import hotkeys from 'hotkeys-js'

export default class extends Controller {
  static get values () {
    return {
      key: String,
      event: String
    }
  }

  initialize () {
    if (this.keyValue) {
      this.valid = true
    } else {
      console.warn('Shortcut key must be defined. Unloading controller.')
      this.element.dataset.controller = this.element.dataset.controller
        .split(' ')
        .filter(controller => controller !== 'shortcut')
        .join(' ')
      return
    }
    this.actOnHotkey = this.actOnHotkey.bind(this)
    const event =
      this.eventValue ||
      this.defaultEventNames[this.element.tagName.toLowerCase()] ||
      'click'
    this.eventFactory = this.newEvent.bind(null, this.element, event)
  }

  connect () {
    if (this.valid) {
      this.actOnHotkey(hotkeys)
      this.connected = true
    }
  }

  disconnect () {
    if (this.connected) this.actOnHotkey(hotkeys.unbind)
    this.connected = false
  }

  actOnHotkey (func) {
    setTimeout(() => {
      func.call(null, this.keyValue, this.eventFactory)
    }, 1)
  }

  newEvent (element, event) {
    element.dispatchEvent(
      new CustomEvent(event, { bubbles: true, cancelable: true })
    )
  }

  get defaultEventNames () {
    return {
      a: e => 'click',
      button: e => 'click',
      form: e => 'submit',
      input: e => (e.getAttribute('type') == 'submit' ? 'click' : 'input'),
      select: e => 'change',
      textarea: e => 'input'
    }
  }
}
