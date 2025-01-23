'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-import-type', (t) => {
    t.print(fixture.tsImportType);
    t.end();
});
