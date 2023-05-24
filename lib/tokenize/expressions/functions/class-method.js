'use strict';

const {isNext} = require('../../is');
const {printParams} = require('./params');

const ClassMethod = {
    print(path, {print, maybe}) {
        const {kind} = path.node;
        const isConstructor = kind === 'constructor';
        const isMethod = kind === 'method';
        const isGetter = /get|set/.test(kind);
        
        maybe.print(isConstructor, kind);
        maybe.print(isMethod, '__key');
        
        if (isGetter) {
            print(kind);
            print(' ');
            print('__key');
        }
        
        printParams(path, {
            print,
        });
        
        print.space();
        print('__body');
    },
    afterSatisfy: () => [
        isNext,
    ],
    after(path, {print}) {
        print.linebreak();
    },
};

module.exports.ClassPrivateMethod = ClassMethod;
module.exports.ClassMethod = ClassMethod;
