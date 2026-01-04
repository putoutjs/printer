import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSMappedType: nameType', (t) => {
    t.print(fixture.tsMappedTypeNameType);
    t.end();
});

test('printer: tokenizer: typescript: TSMappedType: in', (t) => {
    t.print(fixture.tsMappedTypeIn);
    t.end();
});

test('printer: tokenizer: typescript: TSMappedType: no type annotation', (t) => {
    t.print(fixture.tsMappedTypeNoTypeAnnotation);
    t.end();
});
