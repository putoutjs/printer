'use strict';

const {extend} = require('supertape');
const {parse} = require('putout');

const {print} = require('../../printer');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: statement: for', (t) => {
    t.print(fixture.forStatement);
    t.end();
});

test('printer: tokenizer: statement: for: space', (t) => {
    const ast = parse(fixture.forSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.forSpaceFix);
    t.end();
});
