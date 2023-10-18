'use strict';

const {markAfter} = require('../../mark');
const {isNext, isNextParent} = require('../../is');
const {printParams} = require('./params');

module.exports.FunctionDeclaration = {
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        const {
            async,
            generator,
            returnType,
        } = path.node;
        
        maybe.print(async, 'async ');
        
        print('function');
        
        if (!generator) {
            print(' ');
        } else {
            print('*');
            print.space();
        }
        
        print('__id');
        printParams(path, printer, semantics);
        
        if (returnType) {
            print(': ');
            print('__returnType');
        }
        
        print.space();
        print('__body');
    },
    afterSatisfy: () => [isNext, isNextParent],
    after(path, {write}) {
        write.newline();
        markAfter(path);
    },
};
