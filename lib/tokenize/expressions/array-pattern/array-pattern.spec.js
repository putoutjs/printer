'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: array-pattern: space', (t) => {
    const ast = parse(fixture.arrayPatternSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.arrayPatternSpaceFix);
    t.end();
});

test('printer: tokenizer: array-pattern: max-elements', (t) => {
    t.print(fixture.arrayPatternMaxElements, {
        semantics: {
            maxElementsInOnLine: 5,
        },
    });
    t.end();
});
