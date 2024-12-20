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

test('printer: tokenizer: functions: expression: space', (t) => {
    const ast = parse(fixture.functionExpression, {
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
    
    t.equal(result, fixture.functionExpressionFix);
    t.end();
});

test('printer: tokenizer: functions: expression: iife', (t) => {
    t.print(fixture.functionExpressionIife);
    t.end();
});
