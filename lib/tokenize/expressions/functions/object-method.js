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
    print(path, {print, maybe}) {
        const {
            generator,
            kind,
        } = path.node;
        const notMethod = kind !== 'method';
        
        maybe.print(notMethod, `${kind} `);
        maybe.print(generator, '*');
        
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
