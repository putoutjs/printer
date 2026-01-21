import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: ts-declare-function-type', (t) => {
    t.print(fixture.tsDeclareFunctionType);
    t.end();
});
