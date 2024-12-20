'use strict';

const {extend} = require('supertape');

const {parse} = require('putout');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const {print} = require('../../../printer');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('putout: printer: statement: program: directive', (t) => {
    t.print(fixture.programDirective);
    t.end();
});

test('putout: printer: statement: program: endOfFile', (t) => {
    const ast = parse(fixture.programEndOfFile);
    const result = print(ast, {
        format: {
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.programEndOfFile);
    t.end();
});
