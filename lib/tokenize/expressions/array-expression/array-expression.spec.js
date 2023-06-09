'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const {parse} = require('putout');
const {print} = require('../../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: array-expression', (t) => {
    t.print(fixture.arrayExpression);
    t.end();
});

test('printer: tokenizer: array-expression: newline', (t) => {
    t.print(fixture.arrayExpressionNewline);
    t.end();
});

test('printer: tokenizer: array-expression: tuple-member', (t) => {
    t.print(fixture.arrayExpressionTupleMember);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: boolean, identifier', (t) => {
    t.print(fixture.arrayExpressionTupleBooleanIdentifier);
    t.end();
});

test('printer: tokenizer: array-expression: tuple-object', (t) => {
    t.print(fixture.arrayExpressionTupleObject);
    t.end();
});

test('printer: tokenizer: array-expression: tuple-null', (t) => {
    t.print(fixture.arrayExpressionTupleNull);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: identifier, string', (t) => {
    t.print(fixture.arrayExpressionTupleIdentifierString);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: string, other', (t) => {
    t.print(fixture.arrayExpressionTupleStringMember);
    t.end();
});

test('printer: tokenizer: array-expression: object', (t) => {
    t.print(fixture.arrayExpressionObject);
    t.end();
});

test('printer: tokenizer: array-expression: plugins', (t) => {
    t.print(fixture.arrayExpressionPlugins);
    t.end();
});

test('printer: tokenizer: array-expression: plugins: couple lines', (t) => {
    const source = fixture.arrayExpressionPluginsCoupleLines;
    const ast = parse(source);
    const result = print(ast);
    const expected = fixture.arrayExpressionPluginsCoupleLinesFix;
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: array-expression: tuple: string, string', (t) => {
    t.print(fixture.arrayExpressionTupleStringString);
    t.end();
});

test('printer: tokenizer: statement: ArrayExpression: space', (t) => {
    const ast = parse(fixture.arrayExpressionSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
        },
    });
    
    t.equal(result, fixture.arrayExpressionSpaceFix);
    t.end();
});