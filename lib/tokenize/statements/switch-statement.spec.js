'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('putout: printer: statement: switch-statement', (t) => {
    t.print(fixture.switchStatement, {
        format: {
            indent: '....',
        },
    });
    t.end();
});

test('putout: printer: statement: switch-statement: fall', (t) => {
    t.print(fixture.switchFall);
    t.end();
});
