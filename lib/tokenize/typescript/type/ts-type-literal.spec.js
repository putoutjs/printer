'use strict';

const {extend} = require('supertape');

const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: ts-type-leteral', (t) => {
    t.print(fixture.tsTypeLiteral);
    t.end();
});
