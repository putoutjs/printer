import {types} from '@putout/babel';
import {parse, transform} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const noop = () => {};
const {jsxText} = types;
const {test, fixture} = createTest(import.meta.url);

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
    
    transform(ast, {
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
