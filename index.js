'use strict';

function Promisify (original, thisArg = null) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            function callback (error, ...values) {
                // Reject if error is present
                if (error !== undefined && error !== null) {
                    return reject(error);
                }

                // Resolve multiple success values
                if (values.length > 1) {
                    return resolve(values);
                }

                resolve(values[0]);
            }

            // Calls the original function, optionally binding 
            // it to a `this` scope.
            original.apply(thisArg, [...args, callback]);
        });
    };
}

module.exports = Promisify;
