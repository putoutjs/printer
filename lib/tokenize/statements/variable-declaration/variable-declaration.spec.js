'use strict';

const {transform, parse} = require('putout');

const {createTest} = require('#test');

const {lint} = require('samadhi');

const {print} = require('../../../printer');
const {test, fixture} = createTest(__dirname);

test('putout: printer: variable-declaration: newline', (t) => {
    const source = 'var b = a ** 8;\n';
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('putout: printer: variable-declaration: export', (t) => {
    const source = 'export const x = () => 5;\n';
    const ast = parse(source);
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('putout: printer: variable-declaration: react-hooks', (t) => {
    const source = fixture.reactHooks;
    const expected = fixture.reactHooksFix;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['react-hooks'],
    });
    
    const result = print(ast);
    
    t.equal(result, expected);
    t.end();
});

test('putout: printer: statement: variable-declaration: const: newline', (t) => {
    t.print(fixture.constNewline);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: inside-body: newline', (t) => {
    t.print(fixture.constInsideBodyNewline);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const: one-one: call', (t) => {
    t.print(fixture.constOneOneCall);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const-couple', (t) => {
    t.print(fixture.constCouple);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const-couple: one line', (t) => {
    t.print(fixture.constCoupleOneLine);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const-couple: maxVariablesInOneLine', (t) => {
    t.print(fixture.constMaxVariablesInOneLine);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: var', (t) => {
    t.print(fixture.var);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: const-new-lines', (t) => {
    t.print(fixture.constNewlines);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: var-label', (t) => {
    t.print(fixture.varLabel);
    t.end();
});

test('printer: tokenizer: statement: variable-declaration: before function', (t) => {
    t.print(fixture.variableDeclarationBeforeFunction);
    t.end();
});

test('printer: tokenizer: variable-declaration: space', (t) => {
    const ast = parse(fixture.varSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.varSpaceFix);
    t.end();
});

test('putout: printer: variable-declaration: no-loc-line', async (t) => {
    const source = fixture.varNoLocLine;
    const ast = parse(source);
    
    await lint(source, {
        fix: true,
    });
    const result = print(ast);
    
    t.equal(result, source);
    t.end();
});

test('printer: tokenizer: var: before if', async (t) => {
    const {compile} = await import('goldstein');
    const result = await compile(fixture.varBeforeIf);
    const expected = `${fixture.varBeforeIf}\n`;
    
    t.equal(result, expected);
    t.end();
});

