'use strict';

const {ExpressionStatement} = require('./expression-statement');
const {VariableDeclaration} = require('./variable-declaration');
const {IfStatement} = require('./if-statement');
const {ForOfStatement} = require('./for-of-statement');
const {BlockStatement} = require('./block-statement');
const {ReturnStatement} = require('./return-statement');
const TryStatements = require('./try-statements');

module.exports = {
    BlockStatement,
    ExpressionStatement,
    VariableDeclaration,
    IfStatement,
    ForOfStatement,
    ReturnStatement,
    Program(path, {traverse}) {
        path.get('body').forEach(traverse);
    },
    ...TryStatements,
    ContinueStatement(path, {write, indent}) {
        indent();
        write('continue;\n');
    },
};

