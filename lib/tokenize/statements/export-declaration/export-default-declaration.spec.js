import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: export default: arrow: var', (t) => {
    t.print(fixture.exportDefaultArrowVar);
    t.end();
});

test('printer: tokenizer: statement: export default: arrow: var: body', (t) => {
    t.print(fixture.exportDefaultArrowVarBody);
    t.end();
});
