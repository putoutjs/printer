'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const {parse} = require('putout');
const {print} = require('../../../printer');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: typescript: ts-type-query', (t) => {
    t.print(fixture.tsTypeQuery);
    t.end();
});

