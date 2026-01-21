import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: TSPropertySignature: computed', (t) => {
    t.print(fixture.tsPropertySignatureComputed);
    t.end();
});

test('printer: tokenizer: typescript: TSPropertySignature: comment', (t) => {
    t.print(fixture.tsPropertySignatureComment);
    t.end();
});
