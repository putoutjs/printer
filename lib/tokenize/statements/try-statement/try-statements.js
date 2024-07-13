'use strict';

const {isNext} = require('../../is');

module.exports.TryStatement = {
    print(path, {print}) {
        const finalizer = path.get('finalizer');
        print.indent();
        print('try');
        print.space();
        print('__block');
        print('__handler');
        
        if (finalizer.node) {
            print.space();
            print('finally');
            print.space();
            print(finalizer);
            print.newline();
        }
    },
    afterSatisfy: () => [isNext],
    after(path, {maybe, print}) {
        maybe.print.newline(!path.node.finalizer);
        print.breakline();
    },
};

module.exports.CatchClause = (path, {print, maybe}) => {
    const param = path.get('param');
    const body = path.get('body');
    
    print.space();
    print('catch');
    
    if (!param.node) {
        print.space();
    } else {
        print('(');
        print(param);
        print(')');
        print.space();
    }
    
    print(body);
    maybe.print.newline(isInsideBlock(path));
};

function isInsideBlock(path) {
    return path.parentPath.parentPath.isBlockStatement();
}
