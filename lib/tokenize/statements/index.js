'use strict';

const {ExpressionStatement} = require('./expression-statement');
const {VariableDeclaration} = require('./variable-declaration/variable-declaration');
const {IfStatement} = require('./if-statement');
const {ForOfStatement} = require('./for-of-statement');
const {BlockStatement} = require('./block-statement');
const {ReturnStatement} = require('./return-statement/return-statement');
const TryStatements = require('./try-statements');
const {DebuggerStatement} = require('./debugger-statement');
const {ForStatement} = require('./for-statement');
const importDeclarations = require('./import-declaration/import-declaration');
const exportDeclarations = require('./export-declaration/export-declaration');
const {ExportAllDeclaration} = require('./export-declaration/export-all-declaration');

const {WhileStatement} = require('./while-statement');
const {SwitchStatement} = require('./switch-statement');
const {ForInStatement} = require('./for-in-statement');
const {ExportDefaultDeclaration} = require('./export-declaration/export-default-declaration');
const {BreakStatement} = require('./break-statement');

const {
    ExportNamespaceSpecifier,
    ExportSpecifier,
} = exportDeclarations;

module.exports = {
    ...importDeclarations,
    ...exportDeclarations,
    BlockStatement,
    ExpressionStatement,
    ExportSpecifier,
    ExportNamespaceSpecifier,
    ExportDefaultDeclaration,
    ExportAllDeclaration,
    VariableDeclaration,
    IfStatement,
    ForStatement,
    ForInStatement,
    ForOfStatement,
    ReturnStatement,
    DebuggerStatement,
    LabeledStatement(path, {print}) {
        print('__label');
        print(':');
        print.space();
        print('__body');
    },
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
        // shebang, hashbang
        print(`#!${path.node.value}\n`);
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
