import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statements: shebang: newline', (t) => {
    const ast = parse(fixture.shebangNewline);
    
    const result = print(ast, {
        format: {
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.shebangNewlineFix);
    t.end();
});

test('printer: tokenizer: statements: label', (t) => {
    t.print(fixture.label);
    t.end();
});
