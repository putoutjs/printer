'use strict';

const {extend} = require('supertape');

const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('putout: printer: statement: labeled-statement', (t) => {
    t.print(fixture.labeledStatement);
    t.end();
});

test('putout: printer: statement: labeled-statement: nested', (t) => {
    t.print(fixture.labeledStatementNested);
    t.end();
});
