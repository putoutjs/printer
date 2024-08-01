'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: functions: ClassMethod: computed', (t) => {
    t.print(fixture.classMethodComputed);
    t.end();
});

test('printer: tokenizer: functions: ClassMethod: generator', (t) => {
    t.print(fixture.classMethodGenerator);
    t.end();
});

test('printer: tokenizer: functions: ClassMethod: async', (t) => {
    t.print(fixture.classMethodAsync);
    t.end();
});

test('printer: tokenizer: functions: ClassMethod: typeParameters', (t) => {
    t.print(fixture.classMethodTypeParameters);
    t.end();
});

test('printer: tokenizer: functions: ClassMethod: override', (t) => {
    t.print(fixture.classMethodOverride);
    t.end();
});
