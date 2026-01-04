import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse, transform} from 'putout';
import {types} from '@putout/babel';
import {createTest} from '#test';
import {print} from '#printer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
