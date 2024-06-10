'use strict';

module.exports.maybeWriteLeftBrace = (path, printer, semantics) => {
    maybeWriteBrace(path, printer, semantics, {
        brace: '(',
    });
};

module.exports.maybeWriteRightBrace = (path, printer, semantics) => {
    maybeWriteBrace(path, printer, semantics, {
        brace: ')',
    });
};

function maybeWriteBrace(path, printer, semantics, {brace}) {
    const {parentPath} = path;
    const {type} = parentPath;
    const {roundBraces} = semantics;
    const {write} = printer;
    
    if (type === 'ArrowFunctionExpression') {
        write(brace);
        return;
    }
    
    if (type === 'ConditionalExpression' && path !== parentPath.get('test')) {
        write(brace);
        return;
    }
    
    if (type === 'LogicalExpression') {
        write(brace);
        return;
    }
    
    if (!roundBraces.sequence)
        return;
    
    write(brace);
}
