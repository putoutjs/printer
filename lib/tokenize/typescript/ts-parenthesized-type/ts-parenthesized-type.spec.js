import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse} from '@putout/babel';
import {createTest} from '#test';
import {print} from '#printer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
