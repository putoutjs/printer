import {parse, transform} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: call-expression: iife', (t) => {
    t.print(fixture.callIife);
    t.end();
});

test('printer: tokenizer: call-expression: array', (t) => {
    t.print(fixture.callArray);
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

test('printer: tokenizer: call-expression: member callee is not first argument', (t) => {
    t.print(fixture.callMemberNotFirst);
    t.end();
});

test('printer: tokenizer: call-expression: concatenate', (t) => {
    t.print(fixture.callConcatenate);
    t.end();
});

test('printer: tokenizer: call-expression: concatenate: multiline', (t) => {
    const ast = parse(fixture.callConcatenateMultiline);
    const result = print(ast);
    
    t.equal(result, `${fixture.callConcatenateMultilineFix}\n`);
    t.end();
});

test('printer: tokenizer: call-expression: nested: array first', (t) => {
    t.print(fixture.callNestedArrayFirst);
    t.end();
});

test('printer: tokenizer: call-expression: nested: array last', (t) => {
    t.print(fixture.callNestedArrayLast);
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

test('printer: tokenizer: call-expression: comments', (t) => {
    t.print(fixture.callComments);
    t.end();
});

test('printer: tokenizer: call-expression: comment: internal', (t) => {
    const source = fixture.callCommentInternal;
    const plugin = {
        report: () => '',
        replace: () => ({
            'testFunc (__args)': ({__args}, path) => {
                __args.unshift(__args[1]);
                return path;
            },
        }),
    };
    
    const ast = parse(source);
    
    transform(ast, {
        plugins: [
            ['plugin', plugin],
        ],
    });
    
    const code = print(ast);
    
    t.equal(code, fixture.callCommentInternalFix);
    t.end();
});

test('printer: tokenizer: call-expression: with arg member', (t) => {
    t.print(fixture.callWithArgMember);
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

test('printer: tokenizer: call-expression: maxArgsInOneLine', (t) => {
    t.print(fixture.callMaxArgsInOneLine, {
        semantics: {
            maxArgsInOneLine: 1,
        },
    });
    t.end();
});

test('printer: tokenizer: call-expression: max-args: array', (t) => {
    t.print(fixture.callMaxArgsArray, {
        semantics: {
            maxArgsInOneLine: 1,
        },
    });
    t.end();
});

test('printer: tokenizer: call-expression: comment: arg', (t) => {
    t.print(fixture.callCommentArg);
    t.end();
});

test('printer: tokenizer: call-expression: comment: arg: binary', (t) => {
    t.print(fixture.callCommentArgBinary);
    t.end();
});

test('printer: tokenizer: call-expression: comment: arg: second', (t) => {
    t.print(fixture.callCommentArgSecond);
    t.end();
});

test('printer: tokenizer: call-expression: comment: arg: block', (t) => {
    t.print(fixture.callCommentArgBlock);
    t.end();
});

test('printer: tokenizer: call-expression: comment: arg: no loc', (t) => {
    const ast = parse(fixture.callCommentArg);
    const [{expression}] = ast.program.body;
    
    delete expression.callee.loc;
    
    const result = print(ast);
    
    t.equal(result, `${fixture.callCommentArg}\n`);
    t.end();
});

test('printer: tokenizer: call-expression: comment: trailing', (t) => {
    t.print(fixture.callCommentTrailing);
    t.end();
});

test('printer: tokenizer: call-expression: comment: trailing: last', (t) => {
    t.print(fixture.callCommentTrailingLast);
    t.end();
});

test('printer: tokenizer: call-expression: comment: trailing: couple', (t) => {
    t.print(fixture.callCommentTrailingCouple);
    t.end();
});

test('printer: tokenizer: call-expression: comment: trailing: inline', (t) => {
    const ast = parse(fixture.callCommentTrailingInline);
    const result = print(ast);
    
    t.equal(result, fixture.callCommentTrailingInlineFix);
    t.end();
});

test('printer: tokenizer: call-expression: comment: trailing: block', (t) => {
    t.print(fixture.callCommentTrailingBlock);
    t.end();
});

test('printer: tokenizer: call-expression: comment: trailing: no loc', (t) => {
    const ast = parse(fixture.callCommentTrailingLast);
    const [{expression}] = ast.program.body;
    const [, arg] = expression.arguments;
    
    delete arg.loc;
    
    const result = print(ast);
    
    t.equal(result, `${fixture.callCommentTrailingLast}\n`);
    t.end();
});

test('printer: tokenizer: call-expression: comment: same line: no loc', (t) => {
    const ast = parse(fixture.callCommentNoLocPrev);
    const [{expression}] = ast.program.body;
    const [arg] = expression.arguments;
    
    delete arg.loc;
    
    const result = print(ast);
    
    t.equal(result, `${fixture.callCommentNoLocPrevFix}\n`);
    t.end();
});

test('printer: tokenizer: call-expression: comment: line: end', (t) => {
    t.print(fixture.callCommentLineEnd);
    t.end();
});

test('printer: tokenizer: call-expression: comment: block: end', (t) => {
    t.print(fixture.callCommentBlockEnd);
    t.end();
});
