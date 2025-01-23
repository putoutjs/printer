'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');
const {print} = require('../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statements: shebang: newline', (t) => {
    const ast = parse(fixture.shebangNewline);
    
    const result = print(ast, {
        format: {
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.shebangNewlineFix);
    t.end();
});

test('printer: tokenizer: statements: label', (t) => {
    t.print(fixture.label);
    t.end();
});
