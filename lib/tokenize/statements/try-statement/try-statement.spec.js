'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('putout: printer: statement: try-statement', (t) => {
    t.print(fixture.tryStatement);
    t.end();
});

test('putout: printer: statement: try-statement: minify', (t) => {
    t.print(fixture.tryStatementMinify, {
        format: {
            space: '',
        },
    });
    t.end();
});
