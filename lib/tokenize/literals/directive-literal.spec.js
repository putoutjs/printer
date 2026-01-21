import {parse, transform} from 'putout';
import {types} from '@putout/babel';
import {createTest} from '#test';
import {print} from '#printer';

const {
    directiveLiteral,
    directive,
} = types;

const {test, fixture} = createTest(import.meta.url);

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
