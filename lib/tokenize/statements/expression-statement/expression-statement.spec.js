import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse, transform} from 'putout';
import {print} from '@putout/printer';
import {createTest} from '#test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: statement: expression: newline', (t) => {
    t.print(fixture.expressionNewline);
    t.end();
});

test('printer: tokenizer: statement: expression', (t) => {
    const source = fixture.expressionInsideReturn;
    const ast = parse(source);
    
    transform(ast, source, {
        fixCount: 1,
        plugins: [
            ['merge-return-with-next-sibling', {
                report: () => '',
                fix: ({path, nextPath}) => {
                    const {node} = nextPath;
                    
                    path.node.argument = node;
                    nextPath.remove();
                },
                traverse: ({push}) => ({
                    ReturnStatement(path) {
                        const nextPath = path.getNextSibling();
                        
                        push({
                            path,
                            nextPath,
                        });
                    },
                }),
            }],
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.expressionInsideReturnFix);
    t.end();
});

test('printer: tokenizer: statement: expression: inside assign: after function', (t) => {
    t.print(fixture.expressionInsideAssignAfterFunction);
    t.end();
});

test('printer: tokenizer: statement: expression: after call: indent', (t) => {
    t.print(fixture.expressionAfterCallIndent);
    t.end();
});

test('printer: tokenizer: statement: expression: before if', (t) => {
    const source = fixture.expressionBeforeIf;
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, fixture.expressionBeforeIfFix);
    t.end();
});
