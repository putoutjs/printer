'use strict';

const {createTest} = require('#test');

const {parse} = require('@putout/babel');

const {print} = require('#printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: expressions: ParenthesizedExpression: jsx', (t) => {
    const source = fixture.ParenthesizedExpressionJsx;
    const ast = parse(source, {
        sourceType: 'module',
        createParenthesizedExpressions: true,
        plugins: ['jsx'],
    });
    
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('printer: tokenizer: expressions: ParenthesizedExpression', (t) => {
    const source = fixture.ParenthesizedExpression;
    const ast = parse(source, {
        createParenthesizedExpressions: true,
    });
    
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});
