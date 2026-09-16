import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: ts-method-signature: getter', (t) => {
    t.print(fixture.tsMethodSignatureGetter);
    t.end();
});

test('printer: tokenizer: typescript: ts-method-signature: optional', (t) => {
    t.print(fixture.tsMethodSignatureOptional);
    t.end();
});
