import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSTypeParameterDeclaration', (t) => {
    t.print(fixture.tsTypeParameterDeclaration);
    t.end();
});
