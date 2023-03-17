'use strict';

const {
    isMarked,
    isMarkedBefore,
    isMarkedAfter,
} = require('../mark');
const isPrevNewLine = (path) => {
    const prev = path.getPrevSibling();
    
    if (!prev.node)
        return true;
    
    return isMarkedAfter(prev);
};

module.exports.ForOfStatement = (path, {write, indent, traverse}) => {
    if (!isPrevNewLine(path)) {
        write.indent();
        write.newline();
    }
    
    indent();
    write('for (');
    traverse(path.get('left'));
    write(' of ');
    traverse(path.get('right'));
    write(')');
    
    const bodyPath = path.get('body');
    
    if (bodyPath.isExpressionStatement()) {
        indent.inc();
        write.newline();
        traverse(bodyPath);
        indent.dec();
        write.newline();
    }
    
    if (bodyPath.isBlockStatement()) {
        write(' ');
        traverse(bodyPath);
    }
};
