'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: functions: declaration: space', (t) => {
    const ast = parse(fixture.functionDeclaration, {
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
    
    t.equal(result, fixture.functionDeclarationFix);
    t.end();
});

test('printer: tokenizer: functions: declaration: generator', (t) => {
    t.print(fixture.functionDeclarationGenerator);
    t.end();
});

test('printer: tokenizer: functions: declaration: nested', (t) => {
    t.print(fixture.functionDeclarationNested);
    t.end();
});

test('printer: tokenizer: functions: declaration: indent before assign', (t) => {
    t.print(fixture.functionDeclarationIndentBeforeAssign);
    t.end();
});
