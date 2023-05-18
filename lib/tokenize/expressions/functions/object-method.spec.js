'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const {parse} = require('putout');
const {print} = require('../../../printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: functions: object-method', (t) => {
    t.print(fixture.objectMethod);
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
        },
    });
    
    t.equal(result, fixture.objectMethodSpaceFix);
    t.end();
});
