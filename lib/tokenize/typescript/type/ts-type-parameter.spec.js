import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-type-parameter', (t) => {
    t.print(fixture.tsTypeParameter);
    t.end();
});

test('printer: tokenizer: typescript: ts-type-parameter: default', (t) => {
    t.print(fixture.tsTypeParameterDefault);
    t.end();
});
