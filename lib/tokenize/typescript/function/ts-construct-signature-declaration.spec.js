'use strict';

const {createTest} = require('#test');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: functions: ts-construct-signature-declaration', (t) => {
    t.print(fixture.tsConstructSignatureDeclaration);
    t.end();
});
