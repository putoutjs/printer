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

test('printer: tokenizer: if-statement', (t) => {
    t.print(fixture.ifStatement);
    t.end();
});

test('printer: tokenizer: if-newline', (t) => {
    t.print(fixture.ifNewline);
    t.end();
});

test('printer: tokenizer: if-nested', (t) => {
    t.print(fixture.ifNested);
    t.end();
});

test('printer: tokenizer: ifSpaces', (t) => {
    const ast = parse(fixture.ifSpaces);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
        },
    });
    
    t.equal(result, fixture.ifSpacesFix);
    t.end();
});
