'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: TSExportAssignment', (t) => {
    t.print(fixture.tsExportAssignment);
    t.end();
});

test('printer: tokenizer: typescript: TSExportAssignment: newline', (t) => {
    t.print(fixture.tsExportAssignmentNewline);
    t.end();
});
