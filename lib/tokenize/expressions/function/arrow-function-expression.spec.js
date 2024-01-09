'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const {parse, transform} = require('putout');

const {print} = require('../../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: functions: arrow-function-expression', (t) => {
    t.print(fixture.arrowFunctionExpression);
    t.end();
});

test('printer: tokenizer: functions: arrow-function-expression-parens', (t) => {
    t.print(fixture.arrowFunctionExpressionParens);
    t.end();
});

test('printer: tokenizer: functions: arrow-function-expression: async + typeParameters', (t) => {
    t.print(fixture.arrowAsyncTypeParameters);
    t.end();
});

test('printer: tokenizer: functions: arrow-function-expression: space', (t) => {
    const ast = parse(fixture.arrowSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            newline: '',
            indent: '',
            endOfFile: '',
        },
        semantics: {
            roundBraces: false,
        },
    });
    
    t.equal(result, fixture.arrowSpaceFix);
    t.end();
});

test('printer: transform: expressions: functions: ArrowFunctionExpression: newline', (t) => {
    const source = fixture.arrowFunctionExpressionNewline;
    
    const ast = parse(source);
    
    transform(ast, source, {
        rules: {
            'putout': 'off',
            'putout/convert-method-to-property': 'on',
        },
        plugins: ['putout'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.arrowFunctionExpressionNewlineFix);
    t.end();
});
