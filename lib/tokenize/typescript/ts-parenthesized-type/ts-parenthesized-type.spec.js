import {parse} from '@putout/babel';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

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
