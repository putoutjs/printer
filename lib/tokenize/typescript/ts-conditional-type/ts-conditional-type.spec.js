import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSConditionalType', (t) => {
    t.print(fixture.tsConditionalTypeIndent);
    t.end();
});

test('printer: tokenizer: typescript: TSConditionalType: parens', (t) => {
    t.print(fixture.tsConditionalTypeParens);
    t.end();
});
