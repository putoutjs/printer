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

test('printer: tokenizer: functions: object-method', (t) => {
    t.print(fixture.objectMethod);
    t.end();
});

test('printer: tokenizer: functions: object-method: generator', (t) => {
    t.print(fixture.objectMethodGenerator);
    t.end();
});

test('printer: tokenizer: functions: object-method: computed', (t) => {
    t.print(fixture.objectMethodComputed);
    t.end();
});

test('printer: tokenizer: functions: object-method: typeParameters', (t) => {
    t.print(fixture.objectMethodTypeParameters);
    t.end();
});

test('printer: tokenizer: functions: object-method: space', (t) => {
    const ast = parse(fixture.objectMethodSpace, {
        printer: 'putout',
    });
    
    const result = print(ast, {
        format: {
            space: '',
            newline: '',
            indent: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.objectMethodSpaceFix);
    t.end();
});
