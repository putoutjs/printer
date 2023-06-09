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

test('printer: tokenizer: object-expression', (t) => {
    t.print(fixture.objectExpression);
    t.end();
});

test('printer: tokenizer: object-expression: call', (t) => {
    t.print(fixture.objectExpressionCall);
    t.end();
});

test('printer: tokenizer: object-expression: comment: inside', (t) => {
    t.print(fixture.objectExpressionCommentInside);
    t.end();
});

test('printer: tokenizer: object-expression: space', (t) => {
    t.print(fixture.objectExpressionSpace, {
        format: {
            space: '_',
        },
    });
    t.end();
});

test('printer: tokenizer: object-expression: comment', (t) => {
    const source = fixture.objectExpressionComment;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['remove-unused-variables'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.objectExpressionCommentFix);
    t.end();
});

test('printer: tokenizer: object-expression: param', (t) => {
    t.print(fixture.objectExpressionParam);
    t.end();
});

test('printer: tokenizer: object-expression: spread', (t) => {
    const source = fixture.objectExpressionSpread;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['babel/codemod-object-assign-to-object-spread'],
    });
    
    const code = print(ast);
    
    t.deepEqual(code, fixture.objectExpressionSpreadFix);
    t.end();
});

test('printer: tokenizer: object-expression: spread: logical', (t) => {
    t.print(fixture.objectSpreadLogical);
    t.end();
});
