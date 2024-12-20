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

test('printer: tokenizer: statement: for-of', (t) => {
    t.print(fixture.forOfNewline);
    t.end();
});

test('printer: tokenizer: statement: for-of: inside', (t) => {
    t.print(fixture.forOfInside);
    t.end();
});

test('printer: tokenizer: statement: for-of: await', (t) => {
    t.print(fixture.forOfAwait);
    t.end();
});

test('printer: tokenizer: statement: for-of: space', (t) => {
    const ast = parse(fixture.forOfSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.forOfSpaceFix);
    t.end();
});
