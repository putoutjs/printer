'use strict';

const {createTest} = require('#test');

const {parse} = require('@putout/babel');
const {transform} = require('putout');

const {print} = require('#printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSParenthesizedType', (t) => {
    const source = fixture.tsParenthesizedType;
    const ast = parse(source, {
        createParenthesizedExpressions: true,
        plugins: ['typescript'],
    });
    
    transform(ast, source, {
        plugins: ['tape'],
    });
    
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});
