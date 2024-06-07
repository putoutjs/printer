'use strict';

module.exports.maybeWriteBrace = (path, printer, semantics, {brace}) => {
    const {parentPath} = path;
    const {type} = parentPath;
    const {roundBraces} = semantics;
    const {write} = printer;
    
    if (type === 'ArrowFunctionExpression') {
        write(brace);
        return;
    }
    
    if (type === 'LogicalExpression') {
        write(brace);
        return;
    }
    
    if (!roundBraces)
        return;
    
    write(brace);
};
