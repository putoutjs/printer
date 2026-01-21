import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statement: export default: arrow: var', (t) => {
    t.print(fixture.exportDefaultArrowVar);
    t.end();
});

test('printer: tokenizer: statement: export default: arrow: var: body', (t) => {
    t.print(fixture.exportDefaultArrowVarBody);
    t.end();
});
