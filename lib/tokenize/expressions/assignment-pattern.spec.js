import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: assignment-pattern', (t) => {
    t.print(fixture.assignmentPattern);
    t.end();
});
