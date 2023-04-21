'use strict';

const {markAfter} = require('../../mark');
const {isNext} = require('../../is');

module.exports.FunctionDeclaration = {
    print(path, {print, maybe}) {
        const {async} = path.node;
        
        maybe.print(async, 'async ');
        
        print('function ');
        print('__id');
        print('(');
        
        const params = path.get('params');
        const n = params.length - 1;
        
        for (let i = 0; i <= n; i++) {
            print(params[i]);
            
            if (i < n)
                print(', ');
        }
        
        print(') ');
        print('__body');
    },
    afterSatisfy: () => [
        isNext,
    ],
    after(path, {write}) {
        write.newline();
        markAfter(path);
    },
};