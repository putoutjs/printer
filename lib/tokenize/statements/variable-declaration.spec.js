'use strict';

const {parse} = require('putout');
const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const {print} = require('../../printer');

const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('putout: printer: variable-declaration: newline', (t) => {
    const source = 'var b = a ** 8;\n';
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('putout: printer: variable-declaration: export', (t) => {
    const source = 'export const x = () => 5;\n';
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('putout: printer: variable-declaration: const: newline', (t) => {
    t.print(fixture.constNewline);
    t.end();
});
