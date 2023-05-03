'use strict';

const {
    parse,
    transform,
} = require('putout');

const {print} = require('../../../printer');

const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');
const {readFixtures} = require('../../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: tokenizer: statement: import', (t) => {
    t.print(fixture.importDeclaration);
    t.end();
});

test('printer: tokenizer: statement: import: declare', (t) => {
    const source = fixture.importDeclare;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['putout', 'merge-duplicate-imports'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.importDeclareFix);
    t.end();
});
