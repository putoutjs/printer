'use strict';

const {createTest} = require('#test');
const {parse} = require('putout');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: program: directive', (t) => {
    t.print(fixture.programDirective);
    t.end();
});

test('putout: printer: statement: program: endOfFile', (t) => {
    const ast = parse(fixture.programEndOfFile);
    const result = print(ast, {
        format: {
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.programEndOfFile);
    t.end();
});
