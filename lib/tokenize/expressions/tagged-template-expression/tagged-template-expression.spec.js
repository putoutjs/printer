import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: tagged-template-expression', (t) => {
    t.print(fixture.taggedTemplateExpression);
    t.end();
});
