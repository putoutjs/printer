import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: debugger-statement: newline', (t) => {
    t.print(fixture.debuggerStatementNewline);
    t.end();
});
