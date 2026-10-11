# ArcheHTML

HTML renderer for [vanilla microfrontends](https://arche.gallery/).

Source code: [GitHub](https://github.com/richytong/arche-html) |
License: [CFOSS](https://cloutsworld.com/en-us/legal/license/cfoss)

![Node.js CI](https://github.com/richytong/arche-html/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/richytong/ArcheHTML/graph/badge.svg?token=J5EPE5NX4O)](https://codecov.io/gh/richytong/ArcheHTML)
[![npm version](https://img.shields.io/npm/v/arche-html.svg?style=flat)](https://www.npmjs.com/package/arche-html)

## Installation

with [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm):
```bash
npm i arche-html
```

require Arche HTML in [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules):
```javascript
const ArcheHTML = require("arche-html")
```

## Usage

```javascript
const ArcheHTML = require("arche-html")

const archeHtml = new ArcheHTML("/path/to/react/Root.js")

const html = await archeHtml.render("/", {
  global: {
    windowVarA: 1,
    windowVarB: "example",
    windowVarC: [1, 2, 3],
    windowVarD: { a: 1 },
  },
})
```

## Docs

### ArcheHTML

```coffeescript [specscript]
new ArcheHTML(rootImport string, {
  scriptImports: Array<string>,
}) -> ArcheHTML
```

Arche HTML class. Creates an object that renders HTML from the root of an Arche client application. An Arche client application is a software application for the client that uses the [Arche](https://arche.gallery/) library.

Supported libraries with Arche:
  * [React](https://react.dev/)
  * [Styled Components](https://styled-components.com/)
  * [document](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)

Arguments:
  * `rootImport` - `string` - The file path to the root file of the Arche client application.
  * `options`
    * `scriptImports` - `Array<string>` - An array of urls of scripts to import before the root import within a render of an Arche client application. Defaults to `[]`.

```javascript
const ArcheHTML = require("arche-html")

const archeHTML = new ArcheHTML("/path/to/react/Root.js", {
  scriptImports: [
    "/path/to/global.js",
  ],
})
```

#### render

```coffeescript [specscript]
render(url string) -> html Promise<string>

render(url string, options {
  global: Object<string|number|Array|Object>,
}) -> html Promise<string>
```

Renders the Arche client application at the url.

Arguments:
  * `url` - `string` - The value of `location.pathname` that is available to the Arche client application for the render.
  * `options`
    * `global` - `Object<string|number|Array|Object>` - Properties that are directly set on the `window` object of the Arche client application for the render.

Return:
  * `html` - `Promise<string>` - The rendered HTML of the Arche client application.

## License

Arche HTML is distributed under the [CFOSS License](https://cloutsworld.com/en-us/legal/license/cfoss).

# Support

  * minimum Node.js version: 16

## Supported Platforms

  * Linux
