import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: while-statement: indent', (t) => {
    t.print(fixture.whileStatementIndent);
    t.end();
});

test('putout: printer: statement: while-statement: minify', (t) => {
    t.print(fixture.whileStatementMinify, {
        format: {
            space: '',
        },
    });
    t.end();
});
