import {parse} from '@putout/babel';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

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
