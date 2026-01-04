import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSPropertySignature: computed', (t) => {
    t.print(fixture.tsPropertySignatureComputed);
    t.end();
});

test('printer: tokenizer: typescript: TSPropertySignature: comment', (t) => {
    t.print(fixture.tsPropertySignatureComment);
    t.end();
});
