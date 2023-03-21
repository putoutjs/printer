'use strict';

const {ExpressionStatement} = require('./expression-statement');
const {VariableDeclaration} = require('./variable-declaration');
const {IfStatement} = require('./if-statement');
const {ForOfStatement} = require('./for-of-statement');
const {BlockStatement} = require('./block-statement');
const {ReturnStatement} = require('./return-statement');
const TryStatements = require('./try-statements');
const {DebuggerStatement} = require('./debugger-statement');
const {ForStatement} = require('./for-statement');
const importDeclarations = require('./import-declarations');
const exportDeclarations = require('./export-declarations');

module.exports = {
    ...importDeclarations,
    ...exportDeclarations,
    BlockStatement,
    ExpressionStatement,
    VariableDeclaration,
    IfStatement,
    ForStatement,
    ForOfStatement,
    ReturnStatement,
    DebuggerStatement,
    Program(path, {traverse}) {
        path.get('body').forEach(traverse);
    },
    ...TryStatements,
    BreakStatement(path, {print, indent}) {
        indent();
        print('break;');
        print.newline();
    },
    ContinueStatement(path, {indent, print}) {
        indent();
        print('continue;');
        print.newline();
    },
};

