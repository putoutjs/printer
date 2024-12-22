'use strict';

const {isParens} = require('../../maybe/maybe-parens');

module.exports.maybePrintLeftBrace = (path, printer, semantics) => {
    maybeWriteBrace(path, printer, semantics, {
        brace: '(',
    });
};

module.exports.maybePrintRightBrace = (path, printer, semantics) => {
    maybeWriteBrace(path, printer, semantics, {
        brace: ')',
    });
};

function maybeWriteBrace(path, printer, semantics, {brace}) {
    const {parentPath} = path;
    const {type} = parentPath;
    const {roundBraces} = semantics;
    const {write} = printer;
    
    if (path.node.left.type === 'ObjectPattern') {
        write(brace);
        return;
    }
    
    if (type === 'LogicalExpression') {
        write(brace);
        return;
    }
    
    if (type === 'BinaryExpression') {
        write(brace);
        return;
    }
    
    if (type === 'UnaryExpression') {
        write(brace);
        return;
    }
    
    if (!roundBraces.assign)
        return;
    
    if (!isParens(path))
        return;
    
    write(brace);
}
