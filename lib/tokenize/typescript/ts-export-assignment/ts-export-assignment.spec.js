import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSExportAssignment', (t) => {
    t.print(fixture.tsExportAssignment);
    t.end();
});

test('printer: tokenizer: typescript: TSExportAssignment: newline', (t) => {
    t.print(fixture.tsExportAssignmentNewline);
    t.end();
});
