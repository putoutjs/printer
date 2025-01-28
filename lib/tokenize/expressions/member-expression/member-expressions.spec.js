'use strict';

const {createTest} = require('#test');
const {parse, transform} = require('putout');
const {print} = require('#printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: member-expression', (t) => {
    t.print(fixture.memberExpression);
    t.end();
});

test('printer: tokenizer: member-expression: comment', (t) => {
    t.print(fixture.memberExpressionComment);
    t.end();
});

test('printer: tokenizer: optional-member-expression', (t) => {
    t.print(fixture.optionalMemberExpression);
    t.end();
});

test('printer: tokenizer: optional-member-expression: parens', (t) => {
    t.print(fixture.optionalMemberExpressionParens);
    t.end();
});

test('printer: tokenizer: member-expression: nested', (t) => {
    t.print(fixture.memberExpressionNested);
    t.end();
});

test('printer: tokenizer: member-expression: object', (t) => {
    t.print(fixture.memberExpressionObject);
    t.end();
});

test('printer: tokenizer: member-expression: chain: if', (t) => {
    t.print(fixture.memberExpressionChainIf);
    t.end();
});

test('printer: tokenizer: member-expression: Assignment', (t) => {
    t.print(fixture.memberExpressionAssignment);
    t.end();
});

test('printer: tokenizer: member-expression: chain arrow', (t) => {
    t.print(fixture.memberExpressionChainArrow);
    t.end();
});

test('printer: tokenizer: member-expression: transform', (t) => {
    const source = fixture.memberExpressionTransform;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            'convert-quotes-to-backticks',
            'regexp',
        ],
    });
    
    const result = print(ast);
    const expected = fixture.memberExpressionTransformFix;
    
    t.equal(result, expected);
    t.end();
});
