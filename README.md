# AutoForm Trix Extension

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
![GitHub](https://img.shields.io/github/license/jankapunkt/meteor-autoform-trix.svg)

Get the [Trix wysiwyg-editor](https://trix-editor.org/) as configurable AutoForm extension.


## Installation

Since this package is not bound to a specific version of trix, you need to install trix on your host project:

```bash
$ cd projectdir
$ meteor npm install --save trix@latest
```

Then import in your project the `trix-core` of the editor, because Meteor brings already all Polyfills that are required:

```javascript
import 'trix/dist/trix-core'
import 'trix/dist/trix.css'
```

To add this plugin simply add it from atmosphere:

```bash
meteor add jkuester:autoform-trix
```

## Documentation

### Simple Example

Just create a String type field with the `autoform` type `trix`:

```javascript
{
  fieldName: {
    type: String,
    autoform: {
      type: 'trix',
    }
  }
}
```

This renders a default trix editor out-of-the-box.

### Config

To pass the config, use the `config` object on the schema's `autoform` property:


#### Non-Reactive

```javascript
{
  fieldName: {
    type: String,
    autoform: {
      type: 'trix',
      config: {
        undoInterval: 10 // just an example
      }
    }
  }
}
```

#### Reactive

```javascript
{
  fieldName: {
    type: String,
    autoform: {
      type: 'trix',
      config () {
        return myCurrentConfig
      }
    }
  }
}
```

### Lang / i18n

There is a specific config for lang, that it should not be passed using `config` but as own `lang` property.
This is due to the circumstance, that trix does not support reactive i18n out of the box and this extensions
makes use of the Blaze reactivity and `onRendered` in order to reactively update language.

#### Non-Reactive

```javascript
{
  fieldName: {
    type: String,
    autoform: {
      type: 'trix',
      lang: {
        // ... see https://github.com/basecamp/trix/wiki/I18n for the mapping
      }
    }
  }
}

#### Reactive

```javascript
{
  fieldName: {
    type: String,
    autoform: {
      type: 'trix',
      lang () {
        // ... see https://github.com/basecamp/trix/wiki/I18n for the mapping
        return myCurrentLanguageConfig
      }
    }
  }
}


### Events

You can hook into the trix events by using the following pattern within your schema:

```javascript
{
  fieldName: {
    type: String,
    autoform: {
      type: 'trix',
      events: {
        <HookName>(event, templateInstace) {
          
        }
      }
    }
  }
}
```
Where `HookName` is one of the entries of the following mapping:

| EventName                 	| HookName 	            |
|------------------------------	|----------------------	|
| `trix-before-initialize`      | `beforeInitialize`    |
| `trix-initialize`          	| `initialize`         	|
| `trix-change`              	| `change`             	|
| `trix-selection-change`    	| `selectionChange`    	|
| `trix-focus`               	| `focus`              	|
| `trix-blur`                	| `blur`               	|
| `trix-file-accept`         	| `fileAccept`         	|
| `trix-attachment-add`      	| `attachmentAdd`      	|
| `trix-attachment-remove`   	| `attachmentRemove`   	|


**Note** that the `event` parameter is actually a jQuery event. 
If you want to access properties like `event.attachment` you need to get the `originalEvent`, for example:

```javascript
{
  fieldName: {
    type: String,
    autoform: {
      type: 'trix',
        events: {
          attachmentAdd ($event) {
            const event = $event.originalEvent
            if (event.attachment.file) {
              //... process file using your upload library
              // then set attachment like in this example:
              // https://trix-editor.org/js/attachments.js
            }
          }
        }
  }
}
```

## License

See [LICENSE](LICENSE.ms)