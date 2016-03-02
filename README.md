# hyperscript-normalize-args

[![Build status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url] [![XO code style][codestyle-image]][codestyle-url]

> A hyperscript helper to normalize component arguments, for easier creation of reusable components

## Why?

_We want a flexible API to our users but an easy to use and consistent API internally._

This helper enables your hyperscript component to be called in a lot of ways:

```javascript
// selector
component('.class#id');
// selector, props
component('.class.class2', {disabled: true});
// selector, props, child/-ren
component('.class', {title: 'Lorem ipsum'}, 'Hello world');
// selector, child/-ren
component('.class', ['Hello', 'world']);
// props, child/-ren
component({checked: true}, otherComponent('Hello world'));
// child/-ren
component([p('Lorem ipsum'), p('Dolor sit')]);
```

And you can code against a consistent API in your component no matter what!  
You'll always get a `props` object as first argument and a `children` array as the second argument.

See [module usage](#module-usage) for examples.

## Installation

Install `hyperscript-normalize-args` using [npm](https://www.npmjs.com/):

```bash
npm install --save hyperscript-normalize-args
```

## Usage

### Module usage

#### With [Cycle.js](http://cycle.js.org/), [virtual-dom](https://github.com/Matt-Esch/virtual-dom) or [hyperscript](https://github.com/dominictarr/hyperscript)

```javascript
import {button} from '@cycle/dom';
import classNames from 'classnames';
import normalize from 'hyperscript-normalize-args';

const n = normalize(); // no options => DOM mode

// Creating a `myButton` component, which wraps `button` and always add "my-button" as css class
const myButton = n((props, children) => {
	const {
		className,
		...attrs
	} = props;
	return button({...attrs, className: classNames(className, 'my-button')}, children);
});

// myButton can now be used in multiple ways:

myButton('#the-button');
// props = {id: 'the-button'}
// children = []
myButton('#the-button.a-class', {className: 'btn'}, 'Click me');
// props = {id: 'the-button', className: 'a-class btn'}
// children = ['Click me']
myButton('Click me');
// props = {}
// children = ['Click me']
```

### With [snabbdom](https://github.com/paldepind/snabbdom)

```javascript
import h from 'snabbdom/h';
import hh from 'hyperscript-helpers';
import classNames from 'classnames';
import normalize from 'hyperscript-normalize-args';

const {button} = hh(h);
const n = normalize({snabbdom: true}); // snabbdom mode

// Creating a `myButton` component, which wraps `button` and always add "my-button" as css class
const myButton = n((props, children) => {
	const {
		className,
		props: prop,
		...attrs
	} = props;
	return button({...attrs, props: {...prop, className: classNames(className, 'my-button')}}, children);
});

// myButton can now be used in multiple ways:

myButton('#the-button');
// props = {props: {id: 'the-button'}}
// children = []
myButton('#the-button.a-class', {props: {className: 'btn'}}, 'Click me');
// props = {props: {id: 'the-button', className: 'a-class btn'}}
// children = ['Click me']
myButton('Click me');
// props = {}
// children = ['Click me']
```

### With [hyperscript-string](https://github.com/joakimbeng/hyperscript-string)

```javascript
import h from 'hyperscript-string';
import hh from 'hyperscript-helpers';
import classNames from 'classnames';
import normalize from 'hyperscript-normalize-args';

const {button} = hh(h);
const n = normalize({dom: false}); // no dom mode, i.e. string mode

// Creating a `myButton` component, which wraps `button` and always add "my-button" as css class
const myButton = n((props, children) => {
	const {
		class: className,
		...attrs
	} = props;
	return button({...attrs, class: classNames(className, 'my-button')}, children);
});

// myButton can now be used in multiple ways:

myButton('#the-button');
// props = {id: 'the-button'}
// children = []
myButton('#the-button.a-class', {class: 'btn'}, 'Click me');
// props = {id: 'the-button', class: 'a-class btn'}
// children = ['Click me']
myButton('Click me');
// props = {}
// children = ['Click me']
```

## Related packages

* [`hyperscript`](https://www.npmjs.com/package/hyperscript) - Create HyperText with JavaScript, on client or server.
* [`hyperscript-helpers`](https://www.npmjs.com/package/hyperscript-helpers) - Terse syntax for hyperscript
* [`hyperscript-string`](https://www.npmjs.com/package/hyperscript-string) - Create HTML strings with JavaScript
* [`snabbdom`](https://www.npmjs.com/package/snabbdom) - A virtual DOM library with focus on simplicity, modularity, powerful features and performance.
* [`virtual-dom`](https://www.npmjs.com/package/virtual-dom) - A batched diff-based DOM rendering strategy
* [`@cycle/dom`](https://www.npmjs.com/package/@cycle/dom) - The standard DOM Driver for Cycle.js, based on virtual-dom, and other helpers

## API

### `normalize([options])`

| Name | Type | Description |
|------|------|-------------|
| options | `Object` | Normalize options |

Returns: `function`, a normalize function. See [examples](#module-usage) above.

#### `options.dom`

**Type:** `Boolean`  
**Default:** `true`

The mode to use with [Cycle.js, hyperscript or virtual-dom](#with-cyclejs-virtual-dom-or-hyperscript).

When explicitly set to `false` it is good to use with [hyperscript-string](#with-hyperscript-string).

#### `options.snabbdom`

**Type:** `Boolean`  
**Default:** `false`

The mode to use with [snabbdom](#with-snabbdom).

## License

MIT © [Joakim Carlstein](http://joakim.beng.se)

[npm-url]: https://npmjs.org/package/hyperscript-normalize-args
[npm-image]: https://badge.fury.io/js/hyperscript-normalize-args.svg
[travis-url]: https://travis-ci.org/joakimbeng/hyperscript-normalize-args
[travis-image]: https://travis-ci.org/joakimbeng/hyperscript-normalize-args.svg?branch=master
[codestyle-url]: https://github.com/sindresorhus/xo
[codestyle-image]: https://img.shields.io/badge/code%20style-XO-5ed9c7.svg?style=flat
