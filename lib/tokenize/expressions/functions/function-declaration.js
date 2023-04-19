'use strict';

const {hasPrevNewline, markAfter} = require('../../mark');
const {isLast, isNext} = require('../../is');
const isFirst = (path) => !path.getPrevSibling().node;

module.exports.FunctionDeclaration = {
    beforeIf(path) {
        if (isFirst(path))
            return false;
        
        const prev = path.getPrevSibling();
        return prev.isClassDeclaration();
    },
    before(path, {write}) {
        write.newline();
    },
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

