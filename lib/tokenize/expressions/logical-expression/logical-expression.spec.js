'use strict';

const {extend} = require('supertape');

const {parse, transform} = require('putout');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const {print} = require('../../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: logical-expression: newline', (t) => {
    t.print(fixture.logicalExpressionNewline);
    t.end();
});

test('printer: tokenizer: logical-expression: chain', (t) => {
    t.print(fixture.logicalExpressionChain);
    t.end();
});

test('printer: tokenizer: logical-expression: override', (t) => {
    const ast = parse(fixture.logicalExpressionOverride);
    
    const result = print(ast, {
        semantics: {
            maxLogicalsInOneLine: 10,
        },
    });
    
    t.equal(result, fixture.logicalExpressionOverrideFix);
    t.end();
});

test('printer: tokenizer: logical-expression: inside unary', (t) => {
    const source = fixture.LogicalExpressionInsideUnary;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            'convert-optional-to-logical',
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.LogicalExpressionInsideUnaryFix);
    t.end();
});
