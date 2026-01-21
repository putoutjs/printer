import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statement: break-statement', (t) => {
    t.print(fixture.breakStatement);
    t.end();
});
