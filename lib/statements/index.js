'use strict';

const {ExpressionStatement} = require('./expression-statement');
const {VariableDeclaration} = require('./variable-declaration');

module.exports = {
    ExpressionStatement,
    VariableDeclaration,
    Program(path, {traverse}) {
        path.get('body').forEach(traverse);
    },
    BlockStatement(path, {write, incIndent, decIndent, traverse}) {
        incIndent();
        write('{\n');
        path.get('body').forEach(traverse);
        decIndent();
        write('}');
    },
    ReturnStatement(path, {indent, write, traverse}) {
        indent();
        
        if (path.parentPath.node.body.length > 2) {
            write('\n');
            indent();
        }
        
        write('return ');
        traverse(path.get('argument'));
        write(';\n');
    },
    IfStatement(path, {write, traverse}) {
        write('if (');
        traverse(path.get('test'));
        write(') ');
        traverse(path.get('consequent'));
    },
};

