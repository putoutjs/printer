'use strict';

const isFirstStatement = (path) => path.get('body.0')?.isStatement();

module.exports.BlockStatement = (path, {write, indent, traverse, maybe}) => {
    const body = path.get('body');
    
    if (path.parentPath.isBlockStatement())
        indent();
    
    indent.inc();
    write('{');
    
    if (body.length > 1 || isFirstStatement(path))
        write.newline();
    
    body.forEach(traverse);
    indent.dec();
    
    if (body.length)
        indent();
    
    write('}');
    
    if (path.parentPath.isObjectMethod()) {
        write(',');
    }
    
    const shouldAddNewLine = !isTry(path) && !/FunctionExpression/.test(path.parentPath.type);
    
    maybe.print.newline(shouldAddNewLine);
};

function isTry({parentPath}) {
    if (parentPath.isTryStatement())
        return true;
    
    if (parentPath.parentPath?.isTryStatement())
        return true;
    
    return false;
}
