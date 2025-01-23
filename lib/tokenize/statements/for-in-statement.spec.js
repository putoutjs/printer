'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');

const {print} = require('../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: for-in: space', (t) => {
    const ast = parse(fixture.forInSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.forInSpaceFix);
    t.end();
});
