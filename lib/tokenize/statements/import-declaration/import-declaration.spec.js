'use strict';

const {
    parse,
    transform,
    traverse,
} = require('putout');

const {extend} = require('supertape');
const {print} = require('../../../printer');

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

test('printer: tokenizer: statement: import: options: maxSpecifiersInOneLine: default', (t) => {
    t.print(fixture.importDeclarationMaxSpecifiersDefault);
    t.end();
});

test('printer: tokenizer: statement: import: assertions', (t) => {
    t.print(fixture.importAssertions);
    t.end();
});

test('printer: tokenizer: statement: import: declaration: default', (t) => {
    t.print(fixture.importDeclarationDefault);
    t.end();
});

test('printer: tokenizer: statement: import: indent', (t) => {
    t.print(fixture.importIndent);
    t.end();
});

test('printer: tokenizer: statement: import: newline', (t) => {
    t.print(fixture.importNewline);
    t.end();
});

test('printer: tokenizer: statement: import: source', (t) => {
    t.print(fixture.importSource);
    t.end();
});

test('printer: tokenizer: statement: import: deferred', (t) => {
    t.print(fixture.importDeferred);
    t.end();
});

test('printer: tokenizer: statement: import: as', (t) => {
    t.print(fixture.importAs);
    t.end();
});

test('printer: tokenizer: statement: import: long', (t) => {
    t.print(fixture.importLong);
    t.end();
});

test('printer: tokenizer: statement: import: string', (t) => {
    t.print(fixture.importString);
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
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.importDeclarationSpaceFix);
    t.end();
});

test('printer: tokenizer: statement: import: long: override', (t) => {
    const source = fixture.importLongOverride;
    const ast = parse(source);
    
    const result = print(ast, {
        semantics: {
            maxPropertiesLengthInOneLine: 30,
        },
    });
    
    t.equal(result, fixture.importLongOverrideFix);
    t.end();
});
