import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: call-expression: iife', (t) => {
    t.print(fixture.callIife);
    t.end();
});

test('printer: tokenizer: call-expression: callTypeParameters', (t) => {
    t.print(fixture.callTypeParameters);
    t.end();
});

test('printer: tokenizer: call-expression: call-member-if', (t) => {
    t.print(fixture.callMemberIf);
    t.end();
});

test('printer: tokenizer: call-expression: parens', (t) => {
    t.print(fixture.callParens);
    t.end();
});

test('printer: tokenizer: call-expression: top-level', (t) => {
    t.print(fixture.callExpressionTopLevel);
    t.end();
});

test('printer: tokenizer: call-expression: space', (t) => {
    const ast = parse(fixture.callSpace);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.callSpaceFix);
    t.end();
});

test('printer: tokenizer: call-expression: no arguments', (t) => {
    const node = {
        type: 'CallExpression',
        callee: {
            type: 'Identifier',
            name: 'hello',
        },
    };
    
    const result = print(node);
    const expected = 'hello();\n';
    
    t.equal(result, expected);
    t.end();
});
