import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: functions: ClassMethod: computed', (t) => {
    t.print(fixture.classMethodComputed);
    t.end();
});

test('printer: tokenizer: functions: ClassMethod: generator', (t) => {
    t.print(fixture.classMethodGenerator);
    t.end();
});

test('printer: tokenizer: functions: ClassMethod: async', (t) => {
    t.print(fixture.classMethodAsync);
    t.end();
});

test('printer: tokenizer: functions: ClassMethod: typeParameters', (t) => {
    t.print(fixture.classMethodTypeParameters);
    t.end();
});

test('printer: tokenizer: functions: ClassMethod: override', (t) => {
    t.print(fixture.classMethodOverride);
    t.end();
});
