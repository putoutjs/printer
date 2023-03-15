'use strict';

const isFirstStatement = (path) => path.get('body.0')?.isStatement();

module.exports.BlockStatement = (path, {write, indent, traverse}) => {
    const body = path.get('body');
    
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
    
    if (!/FunctionExpression/.test(path.parentPath.type))
        write.newline();
};
