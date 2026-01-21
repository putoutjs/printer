import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statement: empty: after interface', (t) => {
    t.print(fixture.emptyStatementAfterInterface);
    t.end();
});
