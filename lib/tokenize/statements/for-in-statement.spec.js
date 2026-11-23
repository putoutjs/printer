import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: statement: for-in: space', (t) => {
    const ast = parse(fixture.forInSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.forInSpaceFix);
    t.end();
});

test('printer: tokenizer: statement: for-in: empty: last', (t) => {
    t.print(fixture.forInEmptyLast);
    t.end();
});

test('printer: tokenizer: statement: for-in: empty: last: label', (t) => {
    t.print(fixture.forInEmptyLastLabel);
    t.end();
});

test('printer: tokenizer: statement: for-in: no block', (t) => {
    t.print(fixture.forInNoBlock);
    t.end();
});

test('printer: tokenizer: statement: for-in: no block: label', (t) => {
    t.print(fixture.forInNoBlockLabel);
    t.end();
});
