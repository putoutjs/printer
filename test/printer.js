'use strict';

const montag = require('montag');

const tryCatch = require('try-catch');

const {extend} = require('supertape');
const {parse} = require('putout');

const {readFixtures} = require('./fixture');
const {print} = require('..');

const test = extend({
    print: ({fail, equal}) => (fixture) => {
        const ast = parse(fixture);
        const [error, source] = tryCatch(print, ast);
        
        if (error) {
            console.error(error.stack);
            return fail(error);
        }
        
        return equal(source, fixture);
    },
});

const fixture = readFixtures();

test('putout: printer: arrow', (t) => {
    const ast = parse(fixture.arrow);
    const source = print(ast);
    
    t.equal(source, fixture.arrowFix);
    t.end();
});

test('putout: printer: arrow-block-return', (t) => {
    const ast = parse(fixture.arrowBlockReturn);
    const source = print(ast);
    
    t.equal(source, fixture.arrowBlockReturnFix);
    t.end();
});

test('putout: printer: array-expression', (t) => {
    t.print(fixture.arrayExpression);
    t.end();
});

test('putout: printer: array-pattern', (t) => {
    t.print(fixture.arrayPattern);
    t.end();
});

test('putout: printer: arrow-function', (t) => {
    t.print(fixture.arrowFunction);
    t.end();
});

test('putout: printer: assignment-expression', (t) => {
    t.print(fixture.assignmentExpression);
    t.end();
});

test('putout: printer: block-statement', (t) => {
    t.print(fixture.blockStatement);
    t.end();
});

test('putout: printer: computed', (t) => {
    t.print(fixture.computed);
    t.end();
});

test('putout: printer: call-expression', (t) => {
    t.print(fixture.callExpression);
    t.end();
});

test('putout: printer: continue', (t) => {
    t.print(fixture.continue);
    t.end();
});

test('putout: printer: destructuring', (t) => {
    t.print(fixture.destructuring);
    t.end();
});

test('putout: printer: for-of', (t) => {
    t.print(fixture.forOf);
    t.end();
});

test('putout: printer: for-of: one', (t) => {
    t.print(fixture.forOfOne);
    t.end();
});

test('putout: printer: for-of: entries', (t) => {
    t.print(fixture.forOfEntries);
    t.end();
});

test('putout: printer: for-of-var-pattern', (t) => {
    t.print(fixture.forOfVarPattern);
    t.end();
});

test('putout: printer: function-declaration', (t) => {
    t.print(fixture.functionDeclaration);
    t.end();
});

test('putout: printer: if', (t) => {
    t.print(fixture.if);
    t.end();
});

test('putout: printer: new', (t) => {
    t.print(fixture.new);
    t.end();
});

test('putout: printer: variableDeclaration', (t) => {
    t.print(fixture.variableDeclaration);
    t.end();
});

test('putout: printer: object-method', (t) => {
    t.print(fixture.objectMethod);
    t.end();
});

test('putout: printer: ObjectExpression', (t) => {
    t.print(fixture.objectExpression);
    t.end();
});

test('putout: printer: string', (t) => {
    t.print(fixture.string);
    t.end();
});

test('putout: printer: unary-expression', (t) => {
    t.print(fixture.unaryExpression);
    t.end();
});

test('putout: printer: var-couple-lines', (t) => {
    t.print(fixture.varCoupleLines);
    t.end();
});

test('putout: printer: template', (t) => {
    t.print(fixture.template);
    t.end();
});

test('putout: printer: ObjectPattern', (t) => {
    t.print(fixture.objectPattern);
    t.end();
});

test('putout: printer: unknown', (t) => {
    const ast = parse(fixture.unknown, {
        isTS: true,
    });
    const [error] = tryCatch(print, ast);
    
    const expected = montag`
        Node type 'TSTypeAliasDeclaration' is not supported yet: 'type User = {
          name: string;
          password: string;
        };'
    `;
    
    t.equal(error.message, expected);
    t.end();
});
