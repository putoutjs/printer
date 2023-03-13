'use strict';

const {ExpressionStatement} = require('./expression-statement');

module.exports = {
    ExpressionStatement,
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
    VariableDeclaration(path, {write, indent, traverse}) {
        indent();
        write(`const ${path.node.declarations[0].id.name} = `);
        traverse(path.get('declarations.0.init'));
        write(';\n');
    },
    IfStatement(path, {write, traverse}) {
        write('if (');
        traverse(path.get('test'));
        write(') ');
        traverse(path.get('consequent'));
    },
};

