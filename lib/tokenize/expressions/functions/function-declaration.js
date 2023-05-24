'use strict';

const {markAfter} = require('../../mark');

const {
    isNext,
    isNextParent,
} = require('../../is');

const {printParams} = require('./params');

module.exports.FunctionDeclaration = {
    print(path, {print, maybe}) {
        const {async} = path.node;
        
        maybe.print(async, 'async ');
        
        print('function ');
        print('__id');
        print('__typeParameters');
        
        printParams(path, {
            print,
        });
        
        print.space();
        print('__body');
    },
    afterSatisfy: () => [isNext, isNextParent],
    after(path, {write}) {
        write.newline();
        markAfter(path);
    },
};
