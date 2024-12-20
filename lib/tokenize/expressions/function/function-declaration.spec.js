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
