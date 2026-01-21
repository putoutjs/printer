import {createTest} from '#test';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: typescript: functions: ts-construct-signature-declaration', (t) => {
    t.print(fixture.tsConstructSignatureDeclaration);
    t.end();
});
