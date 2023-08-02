'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: functions: ts-construct-signature-declaration', (t) => {
    t.print(fixture.tsConstructSignatureDeclaration);
    t.end();
});
