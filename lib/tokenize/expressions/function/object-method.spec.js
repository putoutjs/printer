import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: functions: object-method', (t) => {
    t.print(fixture.objectMethod);
    t.end();
});

test('printer: tokenizer: functions: object-method: generator', (t) => {
    t.print(fixture.objectMethodGenerator);
    t.end();
});

test('printer: tokenizer: functions: object-method: computed', (t) => {
    t.print(fixture.objectMethodComputed);
    t.end();
});

test('printer: tokenizer: functions: object-method: typeParameters', (t) => {
    t.print(fixture.objectMethodTypeParameters);
    t.end();
});

test('printer: tokenizer: functions: object-method: space', (t) => {
    const ast = parse(fixture.objectMethodSpace, {
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
    
    t.equal(result, fixture.objectMethodSpaceFix);
    t.end();
});
