'use strict';

const {
    isNext,
    isProgramParent,
} = require('../is');
const isFirstStatement = (path) => path.get('body.0')?.isStatement();

module.exports.BlockStatement = (path, {indent, maybe, print}) => {
    const body = path.get('body');
    
    if (path.parentPath.isBlockStatement())
        indent();
    
    indent.inc();
    print('{');
    
    if (body.length > 1 || isFirstStatement(path))
        print.newline();
    
    for (const element of body) {
        print(element);
    }
    
    indent.dec();
    maybe.indent(body.length);
    print('}');
    
    if (path.parentPath.isObjectMethod()) {
        print(',');
    }
    
    if (shouldAddNewlineAfter(path)) {
        print.newline();
    }
};

function shouldAddNewlineAfter(path) {
    const {parentPath} = path;
    
    if (!isNext(path) && !isNext(path.parentPath) && isProgramParent(path.parentPath))
        return false;
    
    if (parentPath.isStatement() && !path.node.body.length && !isNext(parentPath))
        return false;
    
    if (isTry(path) || /FunctionExpression/.test(path.parentPath.type))
        return false;
    
    return true;
}

function isTry({parentPath}) {
    if (parentPath.isTryStatement())
        return true;
    
    if (parentPath.parentPath?.isTryStatement())
        return true;
    
    return false;
}
