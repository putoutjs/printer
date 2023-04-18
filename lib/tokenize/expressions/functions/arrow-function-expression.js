'use strict';

const {exists} = require('../../is');

module.exports.ArrowFunctionExpression = {
    condition({parentPath}) {
        return parentPath.isLogicalExpression();
    },
    before(path, {write}) {
        write('(');
    },
    print(path, {print, maybe, write, traverse}) {
        const {async} = path.node;
        
        maybe.print(async, 'async ');
        print('(');
        
        const params = path.get('params');
        const n = params.length;
        
        for (let i = 0; i < n; i++) {
            print(params[i]);
            
            if (i < n - 1)
                print(', ');
        }
        
        print(')');
        
        const returnType = path.get('returnType');
        
        if (exists(returnType)) {
            write(':');
            write.space();
            traverse(returnType);
        }
        
        print.space();
        print('=>');
        print.space();
        print('__body');
    },
    after(path, {write}) {
        write(')');
    },
};
