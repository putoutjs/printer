import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSTemplateLiteralType', (t) => {
    t.print(fixture.tsTemplateLiteralType);
    t.end();
});
