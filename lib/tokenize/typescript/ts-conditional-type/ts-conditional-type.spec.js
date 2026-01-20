import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSConditionalType', (t) => {
    t.print(fixture.tsConditionalTypeIndent);
    t.end();
});

test('printer: tokenizer: typescript: TSConditionalType: parens', (t) => {
    t.print(fixture.tsConditionalTypeParens);
    t.end();
});
