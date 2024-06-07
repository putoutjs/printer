'use strict';

module.exports.SequenceExpression = (path, printer, semantics) => {
    const {maybe, traverse} = printer;
    
    const expressions = path.get('expressions');
    const n = expressions.length - 1;
    
    maybeWriteBrace(path, printer, semantics, {
        brace: '(',
    });
    
    for (const [index, expression] of expressions.entries()) {
        traverse(expression);
        maybe.write(index < n, ',');
        maybe.write.space(index < n);
    }
    
    maybeWriteBrace(path, printer, semantics, {
        brace: ')',
    });
};

function maybeWriteBrace(path, printer, semantics, {brace}) {
    const {roundBraces} = semantics;
    const {write} = printer;
    
    if (path.parentPath.isArrowFunctionExpression()) {
        write(brace);
        return;
    }
    
    if (path.parentPath.isLogicalExpression()) {
        write(brace);
        return;
    }
    
    if (!roundBraces)
        return;
    
    write(brace);
}
