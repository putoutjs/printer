import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSExportAssignment', (t) => {
    t.print(fixture.tsExportAssignment);
    t.end();
});

test('printer: tokenizer: typescript: TSExportAssignment: newline', (t) => {
    t.print(fixture.tsExportAssignmentNewline);
    t.end();
});
