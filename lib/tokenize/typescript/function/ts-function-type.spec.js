import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-function-type', (t) => {
    t.print(fixture.tsFunctionType);
    t.end();
});

test('printer: tokenizer: typescript: ts-function-type: parens', (t) => {
    t.print(fixture.tsFunctionTypeParens);
    t.end();
});
