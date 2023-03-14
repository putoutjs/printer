'use strict';

const isFirstStatement = (path) => path.get('body.0')?.isStatement();

module.exports.BlockStatement = (path, {write, indent, incIndent, decIndent, traverse}) => {
    const body = path.get('body');
    
    incIndent();
    write('{');
    
    if (body.length > 1 || path.parentPath.isObjectMethod() || isFirstStatement(path))
        write('\n');
    
    body.forEach(traverse);
    decIndent();
    
    indent();
    write('}');
    
    if (path.parentPath.isObjectMethod()) {
        write(',');
    }
    
    if (!/FunctionExpression/.test(path.parentPath.type))
        write('\n');
};

