import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSTupleType', (t) => {
    t.print(fixture.tsTupleType);
    t.end();
});

test('printer: tokenizer: typescript: TSTupleType: empty', (t) => {
    t.print(fixture.tsTupleTypeEmpty);
    t.end();
});

test('printer: tokenizer: typescript: TSTupleType: different', (t) => {
    t.print(fixture.tsTupleTypeDifferent);
    t.end();
});
