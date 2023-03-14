'use strict';

const {ExpressionStatement} = require('./expression-statement');
const {VariableDeclaration} = require('./variable-declaration');
const {IfStatement} = require('./if-statement');

module.exports = {
    ExpressionStatement,
    VariableDeclaration,
    IfStatement,
    Program(path, {traverse}) {
        path.get('body').forEach(traverse);
    },
    BlockStatement(path, {write, indent, incIndent, decIndent, traverse}) {
        const body = path.get('body');
        
        incIndent();
        write('{');
        
        if (body.length > 1 || path.parentPath.isObjectMethod())
            write('\n');
        
        body.forEach(traverse);
        decIndent();
        indent();
        write('}');
        
        if (path.parentPath.isObjectMethod()) {
            write(',');
        }
        
        if (!/FunctionExpression/.test(path.parentPath.type))
            write('\n');
    },
    ReturnStatement(path, {indent, write, traverse}) {
        indent();
        
        if (path?.parentPath?.node?.body?.length > 2) {
            write('\n');
            indent();
        }
        
        write('return');
        const argPath = path.get('argument');
        
        if (argPath.node) {
            write(' ');
            traverse(argPath);
        }
        
        write(';');
        write('\n');
    },
};

