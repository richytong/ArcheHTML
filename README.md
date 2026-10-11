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

require ArcheHTML with Node.js [CommonJS modules](https://nodejs.org/docs/latest/api/modules.html#modules-commonjs-modules):
```javascript
const ArcheHTML = require("arche-html")
```

import ArcheHTML with Node.js [ECMAScript modules](https://nodejs.org/api/esm.html):
```javascript
import ArcheHTML from "arche-html"
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

ArcheHTML class. Creates an object that renders HTML from the root of an Arche client application. An Arche client application is a software application for the client that uses the [Arche](https://arche.gallery/) library.

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

## Polyfills
ArcheHTML aliases `globalThis` as `window` to simulate a client environment, and provides [polyfills](https://en.wikipedia.org/wiki/Polyfill_(programming)) of client global variables for the server as Arche, React, location, localStorage, matchMedia, and document.

To define custom polyfills of global variables for your Arche client application or other script imports, define [polyfills](https://en.wikipedia.org/wiki/Polyfill_(programming)) in a script import of `scriptImports`. Because the script imports are imported in order, the polyfills script should be the first or one of the first script imports. Here is an example of a polyfills script:

```javascript
// polyfills.mjs

import rubico from "rubico/dist/rubico.mjs"

window.rubico = rubico
window.BezierEasing = () => {}
```

Here is an example defining the polyfills script in `scriptImports`:

```javascript
// server.js

const ArcheHTML = require("arche-html")

const archeHTML = new ArcheHTML("/path/to/react/Root.js", {
  scriptImports: [
    "/path/to/polyfills.mjs",
    "/path/to/global.js",
  ],
})
```

The polyfills in ArcheHTML are minimal and incomplete. If you have a need for a polyfill defined in ArcheHTML, please do not hesitate to contribute.

## Contributing

To contribute, you can just open a pull request with a description of the changes.

## License

ArcheHTML is distributed under the [CFOSS License](https://cloutsworld.com/en-us/legal/license/cfoss).

## Support

  * minimum Node.js version: 16

### Supported Platforms

  * Linux
