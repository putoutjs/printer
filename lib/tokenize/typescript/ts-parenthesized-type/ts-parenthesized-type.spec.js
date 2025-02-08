'use strict';

const {createTest} = require('#test');

const {parse} = require('@putout/babel');

const {print} = require('#printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSParenthesizedType', (t) => {
    const source = fixture.tsParenthesizedType;
    const ast = parse(source, {
        createParenthesizedExpressions: true,
        plugins: ['typescript'],
    });
    
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});
