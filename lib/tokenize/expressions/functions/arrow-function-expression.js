'use strict';

const {exists} = require('../../is');
const {printParams} = require('./params');

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
        
        printParams(path, {
            print,
        });
        
        const returnType = path.get('returnType');
        
        if (exists(returnType)) {
            write(':');
            write.space();
            traverse(returnType);
        }
        
        print.space();
        print('=>');
        
        const body = path.get('body');
        
        const insideCall = path.parentPath.isCallExpression();
        const isJSX = body.isJSXElement();
        
        maybe.print.space(!insideCall && isJSX);
        maybe.print.space(!isJSX);
        print('__body');
    },
    after(path, {write}) {
        write(')');
    },
};
