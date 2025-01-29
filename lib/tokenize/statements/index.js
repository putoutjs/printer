'use strict';

const {ExpressionStatement} = require('./expression-statement/expression-statement');
const {VariableDeclaration} = require('./variable-declaration/variable-declaration');
const {IfStatement} = require('./if-statement/if-statement');
const {ForOfStatement} = require('./for-of-statement/for-of-statement');
const {BlockStatement} = require('./block-statement/block-statement');
const {ReturnStatement} = require('./return-statement/return-statement');
const TryStatements = require('./try-statement/try-statements');
const {DebuggerStatement} = require('./debugger-statement');
const {ForStatement} = require('./for-statement');
const importDeclarations = require('./import-declaration/import-declaration');
const exportDeclarations = require('./export-declaration/export-declaration');
const {ExportAllDeclaration} = require('./export-declaration/export-all-declaration');

const {WhileStatement} = require('./while-statement');
const {SwitchStatement} = require('./switch-statement');
const {ForInStatement} = require('./for-in-statement');
const {ExportDefaultDeclaration} = require('./export-declaration/export-default-declaration');
const {BreakStatement} = require('./break-statement/break-statement');
const {DoWhileStatement} = require('./do-while-statement');
const {Program} = require('./program/program');
const {ContinueStatement} = require('./continue-statement/continue-statement');
const {LabeledStatement} = require('./labeled-statement/labeled-statement');

const {
    ExportNamespaceSpecifier,
    ExportSpecifier,
} = exportDeclarations;

module.exports = {
    ...importDeclarations,
    ...exportDeclarations,
    BlockStatement,
    DoWhileStatement,
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
    LabeledStatement,
    Program,
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
    ContinueStatement,
    WhileStatement,
};
