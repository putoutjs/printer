'use strict';

const {isNext} = require('../../is');
const {printParams} = require('./params');
const {maybeDecorators} = require('../../maybe/maybe-decorators');
const {printKey} = require('./kind');

const ClassMethod = {
    print: maybeDecorators((path, printer, semantics) => {
        const {print} = printer;
        const {node} = path;
        const {accessibility, returnType} = node;
        
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
        
        printKey(path, printer);
        printParams(path, printer, semantics);
        
        if (returnType) {
            print(':');
            print.space();
            print('__returnType');
        }
        
        print.space();
        print('__body');
    }),
    afterSatisfy: () => [isNext],
    after(path, {print}) {
        print.linebreak();
    },
};

module.exports.ClassPrivateMethod = ClassMethod;
module.exports.ClassMethod = ClassMethod;
