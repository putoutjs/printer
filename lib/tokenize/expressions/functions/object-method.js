'use strict';

const {isNewlineBetweenSiblings} = require('../../is');
const {printParams} = require('./params');

module.exports.ObjectMethod = {
    beforeIf(path) {
        return path.node.async;
    },
    before(path, {write}) {
        write('async ');
    },
    print(path, {print}) {
        const {kind} = path.node;
        
        if (kind !== 'method')
            print(`${kind} `);
        
        print('__key');
        
        printParams(path, {
            print,
        });
        
        print.space();
        print('__body');
    },
    afterIf(path) {
        return isNewlineBetweenSiblings(path);
    },
    after(path, {print}) {
        print.linebreak();
    },
};
