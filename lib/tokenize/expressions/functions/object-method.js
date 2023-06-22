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
    print(path, {print, maybe, traverse}) {
        const {
            kind,
            generator,
            computed,
        } = path.node;
        
        const notMethod = kind !== 'method';
        
        maybe.print(notMethod, `${kind} `);
        maybe.print(generator, '*');
        
        maybe.print(computed, '[');
        print('__key');
        maybe.print(computed, ']');
        
        printParams(path, {
            print,
            traverse,
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
