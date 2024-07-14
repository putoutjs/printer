'use strict';

const {maybePrintComputed} = require('./maybe-print-computed');

module.exports.printKey = (path, printer) => {
    const key = path.get('key');
    
    maybePrintComputed(path, key, printer);
};
