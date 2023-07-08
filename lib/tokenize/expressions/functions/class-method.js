'use strict';

const {isNext} = require('../../is');
const {printParams} = require('./params');

const ClassMethod = {
    print(path, printer, semantics) {
        const {
            print,
            maybe,
            traverse,
        } = printer;
        const {kind, computed} = path.node;
        const isConstructor = kind === 'constructor';
        const isMethod = kind === 'method';
        const isGetter = /get|set/.test(kind);
        
        maybe.print(isConstructor, kind);
        
        if (isMethod) {
            maybe.print(computed, '[');
            print('__key');
            maybe.print(computed, ']');
        }
        
        if (isGetter) {
            print(kind);
            print(' ');
            print('__key');
        }
        
        printParams(path, printer, semantics);
        
        print.space();
        print('__body');
    },
    afterSatisfy: () => [isNext],
    after(path, {print}) {
        print.linebreak();
    },
};

module.exports.ClassPrivateMethod = ClassMethod;
module.exports.ClassMethod = ClassMethod;
