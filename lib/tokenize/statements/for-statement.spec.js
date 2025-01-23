'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');

const {print} = require('../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: for', (t) => {
    t.print(fixture.forStatement);
    t.end();
});

test('printer: tokenizer: statement: for: space', (t) => {
    const ast = parse(fixture.forSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.forSpaceFix);
    t.end();
});
