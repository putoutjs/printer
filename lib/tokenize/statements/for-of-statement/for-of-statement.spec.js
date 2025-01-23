'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

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
