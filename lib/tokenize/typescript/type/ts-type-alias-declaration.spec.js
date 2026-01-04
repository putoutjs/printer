import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSTypeAliasDeclaration: newline', (t) => {
    t.print(fixture.tsTypeAliasDeclarationNewline);
    t.end();
});

test('printer: tokenizer: typescript: TSType: declare', (t) => {
    t.print(fixture.tsTypeDeclare);
    t.end();
});
