function promisify(original) {
    return function (...args) {
        return new Promise(function (resolve, reject) {
            function callback(err, ...values) {
                if (err) return reject(err);

                // resolve multiple success values
                if (values.length > 1) {
                    return resolve(values);
                }

                resolve(values[0]);
            }

            original(...args, callback); // spread operator: same as `original.apply(original, args)`
        });
    };
}

module.exports = promisify;
