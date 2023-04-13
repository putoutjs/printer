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
const {WhileStatement} = require('./while-statement');
const {SwitchStatement} = require('./switch-statement');
const {ForInStatement} = require('./for-in-statement');
const {ExportDefaultDeclaration} = require('./export-default-declaration');
const {BreakStatement} = require('./break-statement');
const {ExportSpecifier} = exportDeclarations;

module.exports = {
    ...importDeclarations,
    ...exportDeclarations,
    BlockStatement,
    ExpressionStatement,
    ExportSpecifier,
    ExportDefaultDeclaration,
    VariableDeclaration,
    IfStatement,
    ForStatement,
    ForInStatement,
    ForOfStatement,
    ReturnStatement,
    DebuggerStatement,
    Program(path, {print}) {
        print('__interpreter');
        
        path
            .get('body')
            .forEach(print);
        
        print.newline();
    },
    EmptyStatement(path, {write}) {
        write(';');
    },
    InterpreterDirective(path, {print}) {
        print(`#!${path.node.value}`);
        print.newline();
        print.newline();
    },
    SwitchStatement,
    ...TryStatements,
    BreakStatement,
    ContinueStatement(path, {indent, print}) {
        indent();
        print('continue;');
        print.newline();
    },
    WhileStatement,
};
