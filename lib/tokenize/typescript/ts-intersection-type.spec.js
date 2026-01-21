import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSIntersectionType', (t) => {
    t.print(fixture.tsIntersectionType);
    t.end();
});
