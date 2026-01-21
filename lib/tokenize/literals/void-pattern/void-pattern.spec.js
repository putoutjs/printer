import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenize: literals: VoidPattern', (t) => {
    t.print(fixture.voidPattern);
    t.end();
});
