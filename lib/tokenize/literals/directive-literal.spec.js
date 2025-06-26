'use strict';

const {createTest} = require('#test');
const {parse, transform} = require('putout');

const {print} = require('#printer');
const {types} = require('@putout/babel');
const {
    directiveLiteral,
    directive,
} = types;
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: literals: DirectiveLiteral', (t) => {
    t.print(fixture.directiveLiteral);
    t.end();
});

test('printer: tokenize: literals: DirectiveLiteral: no raw', (t) => {
    const source = '';
    
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, source, {
        plugins: [
            ['convert', {
                report: () => '',
                traverse: () => ({
                    Program(path) {
                        path.node.directives = [directive(directiveLiteral('hello'))];
                    },
                }),
            }],
        ],
    });
    
    const result = print(ast);
    const expected = `'hello';\n`;
    
    t.equal(result, expected);
    t.end();
});

