'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

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
