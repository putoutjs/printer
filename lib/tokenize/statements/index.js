'use strict';

const {ExpressionStatement} = require('./expression-statement');
const {VariableDeclaration} = require('./variable-declaration');
const {IfStatement} = require('./if-statement');
const {ForOfStatement} = require('./for-of-statement');
const {BlockStatement} = require('./block-statement');

module.exports = {
    BlockStatement,
    ExpressionStatement,
    VariableDeclaration,
    IfStatement,
    ForOfStatement,
    Program(path, {traverse}) {
        path.get('body').forEach(traverse);
    },
    ContinueStatement(path, {write, indent}) {
        indent();
        write('continue;\n');
    },
    ReturnStatement(path, {indent, write, traverse}) {
        if (path?.parentPath?.node?.body?.length > 2) {
            write.indent();
            write.newline();
        }
        
        indent();
        write('return');
        
        const argPath = path.get('argument');
        
        if (argPath.node) {
            write(' ');
            traverse(argPath);
        }
        
        write(';');
        write.newline();
    },
};

