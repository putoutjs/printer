import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: expression: leading comment', (t) => {
    t.print(fixture.expressionLeadingComment);
    t.end();
});

test('printer: tokenizer: statement: expression: inside arrow: leading comment', (t) => {
    t.print(fixture.expressionInsideArrowLeadingComment);
    t.end();
});

test('printer: tokenizer: statement: expression: inside body: leading comment', (t) => {
    t.print(fixture.expressionInsideBodyLeadingComment);
    t.end();
});
