import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-as-expression-new', (t) => {
    t.print(fixture.tsAsExpressionNew);
    t.end();
});

test('printer: tokenizer: typescript: ts-as-expression: object', (t) => {
    t.print(fixture.tsAsExpressionObject);
    t.end();
});
