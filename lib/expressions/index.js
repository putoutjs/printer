'use strict';

const functions = require('./functions');

module.exports = {
    ...functions,
    BinaryExpression(path, {traverse, write}) {
        traverse(path.get('left'));
        write(` ${path.node.operator} `);
        traverse(path.get('right'));
    },
    CallExpression(path, {traverse, write}) {
        const prevPath = path.parentPath.getPrevSibling();
        const prevPrevPath = prevPath.getPrevSibling();
        
        if (!isCallInsideExpression(prevPath) && !isCallInsideExpression(prevPrevPath)) {
            write('\n');
        }
        
        traverse(path.get('callee'));
        write('(');
        path.get('arguments').forEach(traverse);
        write(')');
    },
};

function isCallInsideExpression(path) {
    return path.get('expression').isCallExpression();
}
