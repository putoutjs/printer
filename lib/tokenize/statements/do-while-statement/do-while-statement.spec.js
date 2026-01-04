import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: do-while', (t) => {
    t.print(fixture.doWhileStatement);
    t.end();
});

test('printer: tokenizer: statement: do-while: minify', (t) => {
    t.print(fixture.doWhileStatementMinify, {
        format: {
            space: '',
        },
    });
    t.end();
});
