'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('putout: printer: expressions: tuple-expression', (t) => {
    t.print(fixture.tupleExpression);
    t.end();
});
