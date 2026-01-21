import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: ts-import-type', (t) => {
    t.print(fixture.tsImportType);
    t.end();
});
