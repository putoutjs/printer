import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: functions: declaration: space', (t) => {
    const ast = parse(fixture.functionDeclaration, {
        printer: 'putout',
    });
    
    const result = print(ast, {
        format: {
            space: '',
            newline: '',
            indent: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.functionDeclarationFix);
    t.end();
});

test('printer: tokenizer: functions: declaration: generator', (t) => {
    t.print(fixture.functionDeclarationGenerator);
    t.end();
});

test('printer: tokenizer: functions: declaration: nested', (t) => {
    t.print(fixture.functionDeclarationNested);
    t.end();
});

test('printer: tokenizer: functions: declaration: indent before assign', (t) => {
    t.print(fixture.functionDeclarationIndentBeforeAssign);
    t.end();
});

test('printer: tokenizer: functions: declaration: indent before function', (t) => {
    t.print(fixture.functionDeclarationIndentBeforeFunction);
    t.end();
});

test('printer: tokenizer: functions: declaration: newline', (t) => {
    t.print(fixture.functionDeclarationNewline);
    t.end();
});
