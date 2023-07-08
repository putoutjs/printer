'use strict';

const {markAfter} = require('../../mark');

const {isNext, isNextParent} = require('../../is');

const {printParams} = require('./params');

module.exports.FunctionDeclaration = {
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        
        const {async, generator} = path.node;
        
        maybe.print(async, 'async ');
        
        print('function ');
        maybe.print(generator, '*');
        
        print('__id');
        print('__typeParameters');
        
        printParams(path, printer, semantics);
        
        print.space();
        
        print('__body');
    },
    afterSatisfy: () => [isNext, isNextParent],
    after(path, {write}) {
        write.newline();
        markAfter(path);
    },
};
