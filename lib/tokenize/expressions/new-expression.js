'use strict';

const {exists} = require('../is');
const isInsideExpressionStatement = ({parentPath}) => parentPath.isExpressionStatement();
const notFirst = ({parentPath}) => exists(parentPath.getPrevSibling());

const getPrev = ({parentPath}) => {
    const prev = parentPath.getPrevSibling();
    return [
        prev.node,
        prev,
    ];
};

module.exports.NewExpression = {
    beforeIf(path) {
        if (!isInsideExpressionStatement(path))
            return false;
        
        const [exists, prev] = getPrev(path);
        
        if (!exists)
            return false;
        
        if (prev.isExpressionStatement())
            return false;
        
        return notFirst(path);
    },
    before(path, {print}) {
        print.breakline();
    },
    print(path, {print, maybe}) {
        print('new ');
        print('__callee');
        print('__typeParameters');
        
        const args = path.get('arguments');
        print('(');
        
        const n = args.length - 1;
        
        for (const [i, arg] of args.entries()) {
            print(arg);
            maybe.print(i < n, ', ');
        }
        
        print(')');
    },
};
