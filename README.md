# ES2015 Promisify Library

[![NPM version](https://img.shields.io/npm/v/es-promisify.svg)](https://npmjs.org/package/es-promisify)
[![NPM downloads](https://img.shields.io/npm/dt/es-promisify.svg)](https://npmjs.org/package/es-promisify)
[![Build Status](https://travis-ci.org/cebor/es-promisify.svg?branch=master)](https://travis-ci.org/cebor/es-promisify)

This library enables node-styled functions to work as [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Promise)s through the use of ES2015 syntax.

## Examples

### Single-valued callback with multiple parameters

For a snipped like the following:

```javascript
'use strict';

const Promisify = require('es-promisify');

// Test a promise that returns a single value
function sum (a, b, callback) {
    callback(null, a + b);
}

async function main () {
    let sumPromise = Promisify(sum);
    console.log(await sumPromise(2, 2));
}

main();
```

We'd expect to have an output like this one:

```bash
4
```

## Multiple-valued output with multiple arguments

For a snippet like the following

```javascript
'use strict';

const Promisify = require('es-promisify');

// Test return of multiple values
function multiOutput (a, b, callback) {
    callback(null, a, b);
}

async function main () {
    let multiOutputPromise = Promisify(multiOutput);
    console.log(await multiOutputPromise('a', 'b');
}

main();
```

We'd expect to have an output like this one:

```bash
['a', 'b']
```

## Function bound to an object state

For a snippet like the following:

```javascript
'use strict';

const Promisify = require('es-promisify');

// Test binding of methods inside objects
class Bindable {
    constructor () {
        this._prop = 3;
    }

    get prop () {
        return this._prop;
    }

    increment (callback) {
        this._prop += 1;
        callback(null, this.prop);
    }
}

async function main () {
    let bindable = new Bindable();
    let incrementPromise = Promisify(bindable.increment, bindable);
    console.log(await incrementPromise());
}

main();
```

We'd expect an output like this one:

```bash
4
```
