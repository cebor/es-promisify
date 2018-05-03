'use strict';

const Promisify = require('.');

// Test a promise that returns a single value
function sum (a, b, callback) {
    callback(null, a + b);
}
let sumPromise = Promisify(sum);

// Test return of multiple values
function multCallbacker (a, b, callback) {
    callback(null, a, b);
}

let multCallbackerPromise = Promisify(multCallbacker);

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

let bindable = new Bindable();
let incrementPromise = Promisify(bindable.increment, bindable);

async function main () {
    assert((await sumPromise(2, 2)) === 4);
    assert((await multCallbackerPromise('a', 'b'))[1] === 'b');
    assert((await incrementPromise()) === 4);
}

main();
