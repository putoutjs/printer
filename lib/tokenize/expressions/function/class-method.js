'use strict';

const {isNext, isPrev} = require('../../is');
const {printParams} = require('./params');

const ClassMethod = {
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        const {node} = path;
        const {
            kind,
            computed,
            generator,
            accessibility,
            returnType,
            decorators,
        } = node;
        
        const isConstructor = kind === 'constructor';
        const isMethod = kind === 'method';
        const isGetter = /get|set/.test(kind);
        
        if (decorators) {
            for (const decorator of path.get('decorators')) {
                maybe.print.breakline(isPrev(path));
                print(decorator);
                print.breakline();
            }
        }
        
        if (accessibility) {
            print(accessibility);
            print(' ');
        }
        
        if (node.static) {
            print('static');
            print(' ');
        }
        
        if (node.async) {
            print('async');
            print(' ');
        }
        
        maybe.print(generator, '*');
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
