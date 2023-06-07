'use strict';

const {
    parse,
    transform,
    traverse,
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

test('printer: tokenizer: statement: import: attributes', (t) => {
    t.print(fixture.importAttributes);
    t.end();
});

test('printer: tokenizer: statement: import: options: maxSpecifiersInOneLine', (t) => {
    t.print(fixture.importDeclarationMaxSpecifiers, {
        semantics: {
            maxSpecifiersInOneLine: 1,
        },
    });
    t.end();
});

test('printer: tokenizer: statement: import: assertions', (t) => {
    t.print(fixture.importAssertions);
    t.end();
});

test('printer: tokenizer: statement: import: assertions: no field', (t) => {
    const ast = parse(fixture.importAssertions, {
        printer: 'putout',
    });
    
    traverse(ast, {
        ImportDeclaration(path) {
            path.node.extra = {
                deprecatedAssertSyntax: true,
            };
        },
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.importAssertionsFix);
    t.end();
});

test('printer: tokenizer: statement: import: attributes: no assertions', (t) => {
    const ast = parse(fixture.importAttributes, {
        printer: 'putout',
    });
    
    traverse(ast, {
        ImportDeclaration(path) {
            delete path.node.assertions;
        },
    });
    
    const result = print(ast).slice(0, -1);
    
    t.equal(result, fixture.importAttributes);
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

test('printer: tokenizer: statement: import: space', (t) => {
    const source = fixture.importDeclarationSpace;
    
    const ast = parse(source, {
        isTS: true,
    });
    
    const result = print(ast, {
        format: {
            space: '',
            newline: '',
            indent: '',
        },
    });
    
    t.equal(result, fixture.importDeclarationSpaceFix);
    t.end();
});
