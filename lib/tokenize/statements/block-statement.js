'use strict';

const isFirstStatement = (path) => path.get('body.0')?.isStatement();

module.exports.BlockStatement = (path, {indent, maybe, print}) => {
    const body = path.get('body');
    
    if (path.parentPath.isBlockStatement())
        indent();
    
    indent.inc();
    print('{');
    
    if (body.length > 1 || isFirstStatement(path))
        print.newline();
    
    body.forEach(print);
    indent.dec();
    
    maybe.indent(body.length);
    print('}');
    
    if (path.parentPath.isObjectMethod()) {
        print(',');
    }
    
    const shouldAddNewLine = !isNewLineAdded(path);
    
    maybe.print.newline(shouldAddNewLine);
};

function isNewLineAdded(path) {
    const {parentPath} = path;
    
    if (isTry(path) || /FunctionExpression/.test(path.parentPath.type))
        return true;
    
    if (parentPath.isIfStatement() && parentPath.get('consequent').node === path.node && parentPath.node.alternate)
        return true;
    
    return false;
}

function isTry({parentPath}) {
    if (parentPath.isTryStatement())
        return true;
    
    if (parentPath.parentPath?.isTryStatement())
        return true;
    
    return false;
}

