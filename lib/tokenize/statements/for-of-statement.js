'use strict';

const {isMarkedPrevAfter} = require('../mark');
const {isFirst} = require('../is');

module.exports.ForOfStatement = (path, {write, indent, traverse}) => {
    if (!isFirst(path) && !isMarkedPrevAfter(path)) {
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
