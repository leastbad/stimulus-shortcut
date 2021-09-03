<h1 align="center">Stimulus Shortcut</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/stimulus-shortcut" rel="nofollow">
    <img src="https://badge.fury.io/js/stimulus-shortcut.svg" alt="npm version">
  </a>
</p>

<p align="center">
  <b>A Stimulus controller for mapping keystrokes to element events</b></br>
  <sub>Tiny at ~60 LOC </sub>
</p>

<br />

- **Simple**: with only one parameter, this is a drop-in, code-free solution
- **Backend Agnostic**: 100% client-side
- **Flexible**: built on the amazing [HotKeys.js](https://wangchujiang.com/hotkeys/) library
- **Idempotent**: compatible with Turbolinks by design
- **MIT Licensed**: free for personal and commercial use

## Built for StimulusJS

This [Stimulus](https://stimulus.hotwired.dev/) controller allows you to detect a keyboard shortcut and trigger the default action of the element the controller is attached to. This is an easy way to create shortcut keys for your application. Once registered in your Stimulus application, you can use it anywhere you like.

This controller is the sister to [stimulus-hotkeys](https://www.npmjs.com/package/stimulus-hotkeys) and since they share the same dependency, both can be used in the same project to great effect.

Here is a simple example, in which the user hits the `p` key and it will "click" the link.

```html
<a data-controller="shortcut" data-shortcut-key-value="p">Type 'p' to activate me!</a>
```

<tiny>Yes, that's really it.</tiny>

### Credit where credit is due

This package would be nothing without [Hotkeys](https://wangchujiang.com/hotkeys/). Thank you, Kenny Wong!

The idea for this variation on `stimulus-hotkeys` was inspired by and borrows code extensively from Stephen Margheim aka [@fractaledmind](https://github.com/fractaledmind).

## Setup

Note: **stimulus-shortcut requires StimulusJS v2.0+**

Add stimulus-shortcut to your main JS entry point or Stimulus controllers root folder:

```js
import { Application } from 'stimulus'
import Shortcut from 'stimulus-shortcut'

import { definitionsFromContext } from 'stimulus/webpack-helpers'
const application = Application.start()
const context = require.context('../controllers', true, /\.js$/)
application.load(definitionsFromContext(context))

// Manually register Shortcut as a Stimulus controller
application.register('shortcut', Shortcut)
```

## HTML Markup

The `data-shortcut-key-value` attribute accepts a string representing a Hotkeys key combination. You will want to learn about possible key combinations on the [Hotkeys project page](https://wangchujiang.com/hotkeys/).

This controller follows the Stimulus [default event shorthand](https://stimulusjs.org/reference/actions#event-shorthand) and defaults to the `click` event. However, you can specify any event - browser or custom - by specifying the `data-shortcut-event-value` attribute.

Here is an example where pressing the `m` key raises the mouseover event on an `img` element.

```html
<img src="image.jpg" data-controller="shortcut" data-shortcut-key-value="m" data-shortcut-event-value="mouseover">
```

**Note**: `data-shortcut-key-value` is a mandatory attribute. If you don't define a key to capture, the controller will remove itself from the element and a console warning will be raised.

### Obtaining a reference to the Stimulus controller instance

I'm usually a huge fan of putting a reference to the controller on the element holding the controller, but this library literally has no functions which can be called from outside. If you're trying to do this, you're doing something very wrong.

## Contributing

Bug reports and pull requests are welcome.

## License

This package is available as open source under the terms of the MIT License.