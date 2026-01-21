import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statement: for', (t) => {
    t.print(fixture.forStatement);
    t.end();
});

test('printer: tokenizer: statement: for: space', (t) => {
    const ast = parse(fixture.forSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.forSpaceFix);
    t.end();
});
