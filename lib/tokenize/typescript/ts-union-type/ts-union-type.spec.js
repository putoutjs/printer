'use strict';

const {createTest} = require('#test');
const {parse, transform} = require('putout');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: typescript: ts-union-type', (t) => {
    t.print(fixture.tsUnionType);
    t.end();
});

test('printer: tokenizer: typescript: ts-union-type: more', (t) => {
    t.print(fixture.tsUnionTypeMore);
    t.end();
});

test('printer: tokenizer: typescript: ts-union-type: inside function', (t) => {
    t.print(fixture.tsUnionTypeInsideFunction);
    t.end();
});

test('printer: tokenizer: ts-union-type: override', (t) => {
    const ast = parse(fixture.tsUnionTypeOverride, {
        isTS: true,
    });
    
    const result = print(ast, {
        semantics: {
            maxTypesInOneLine: 5,
        },
    });
    
    t.equal(result, fixture.tsUnionTypeOverrideFix);
    t.end();
});

test('printer: tokenizer: typescript: ts-union-type: parens', (t) => {
    const source = fixture.tsUnionTypeParens;
    const ast = parse(source, {
        isTS: true,
    });
    
    transform(ast, source, {
        plugins: [
            ['remove-parens', {
                report: () => '',
                include: () => ['TSUnionType'],
                fix: (path) => {
                    delete path.node.extra;
                },
            }],
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.tsUnionTypeParensFix);
    t.end();
});
