'use strict';

const {types} = require('@putout/babel');
const {createTest} = require('#test');
const {parse, transform} = require('putout');

const {print} = require('#printer');
const noop = () => {};
const {jsxText} = types;
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: jsx: jsx-text', (t) => {
    t.print(fixture.jsxText);
    t.end();
});

test('printer: tokenizer: jsx: text: gt', (t) => {
    t.print(fixture.jsxTextGt);
    t.end();
});

test('printer: tokenizer: jsx: jsx-text: no raw', (t) => {
    const source = '<a></a>';
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            ['add-jsx-text', {
                report: noop,
                include: () => ['JSXElement'],
                fix: (path) => path.node.children = [jsxText('hello')],
            }],
        ],
    });
    
    const result = print(ast);
    const expected = '<a>hello</a>;\n';
    
    t.equal(result, expected);
    t.end();
});
