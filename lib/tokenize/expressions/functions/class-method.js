'use strict';

const {isNext} = require('../../is');
const {printParams} = require('./params');

const ClassMethod = {
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        
        const {
            kind,
            computed,
            generator,
            accessibility,
            returnType,
        } = path.node;
        
        const isConstructor = kind === 'constructor';
        const isMethod = kind === 'method';
        const isGetter = /get|set/.test(kind);
        
        maybe.print(isConstructor, kind);
        maybe.print(generator, '*');
        
        if (accessibility) {
            print(accessibility);
            print(' ');
        }
        
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
        
        if (returnType) {
            print(':');
            print.space();
            print('__returnType');
        }
        
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
