'use strict';

const {test} = require('supertape');
const {parse} = require('putout');
const {print} = require('../../printer');

test('putout: printer: variable-declaration: newline', (t) => {
    const source = 'var b = a ** 8;\n\n';
    const ast = parse(source);
    
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});
