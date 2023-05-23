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

test('printer: tokenizer: call-expression: iife', (t) => {
    t.print(fixture.iife);
    t.end();
});

test('printer: tokenizer: call-expression: callTypeParameters', (t) => {
    t.print(fixture.callTypeParameters);
    t.end();
});

test('printer: tokenizer: call-expression: call-member-if', (t) => {
    t.print(fixture.callMemberIf);
    t.end();
});

test('printer: tokenizer: call-expression: space', (t) => {
    const ast = parse(fixture.callSpace);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.callSpaceFix);
    t.end();
});
