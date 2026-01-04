import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: labeled-statement', (t) => {
    t.print(fixture.labeledStatement);
    t.end();
});

test('putout: printer: statement: labeled-statement: nested', (t) => {
    t.print(fixture.labeledStatementNested);
    t.end();
});

test('putout: printer: statement: labeled-statement: indent', (t) => {
    t.print(fixture.labeledStatementIndent);
    t.end();
});
