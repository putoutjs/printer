import {
    template,
    parse,
    transformAsync,
} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: assignment-expression: overrides', (t) => {
    const ast = parse(fixture.assignmentExpression);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.assignmentExpressionFix);
    t.end();
});

test('printer: tokenizer: assignment-expression: parens: putout', async (t) => {
    const source = fixture.assignmentExpressionParens;
    const ast = parse(source);
    
    await transformAsync(ast, source, {
        plugins: ['minify'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.assignmentExpressionParensFix);
    t.end();
});

test('printer: tokenizer: assignment-expression: no loc: putout', async (t) => {
    const source = fixture.assignmentExpressionNoLoc;
    const ast = parse(source);
    
    await transformAsync(ast, source, {
        rules: {
            'variables': 'off',
            'nodejs': 'off',
            'nodejs/add-missing-strict-mode': 'on',
            'variables/remove-useless': 'on',
        },
        plugins: ['nodejs', 'variables'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.assignmentExpressionNoLocFix);
    t.end();
});

test('printer: tokenizer: assignment-expression: couple lines', (t) => {
    t.print(fixture.assignmentExpressionCoupleLines);
    t.end();
});

test('printer: tokenizer: assignment-expression: after function', (t) => {
    t.print(fixture.assignmentExpressionAfterFunction);
    t.end();
});

test('printer: tokenizer: assignment-expression: nested', (t) => {
    t.print(fixture.assignmentExpressionNested);
    t.end();
});

test('printer: tokenizer: assignment-expression: braces', (t) => {
    const ast = parse(fixture.assignmentExpressionBraces);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
        semantics: {
            roundBraces: {
                assign: true,
            },
        },
    });
    
    t.equal(result, fixture.assignmentExpressionBracesFix);
    t.end();
});

test('printer: tokenizer: assignment-expression: no braces', (t) => {
    const ast = parse(fixture.assignmentExpressionNoBraces);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
        semantics: {
            roundBraces: false,
        },
    });
    
    t.equal(result, fixture.assignmentExpressionNoBracesFix);
    t.end();
});

test('printer: tokenizer: assignment-expression: unary', (t) => {
    t.print(fixture.assignmentExpressionUnary);
    t.end();
});

test('printer: tokenizer: assignment-expression: inside-body: without ExpressionStatement', async (t) => {
    const source = fixture.assignInsideBodyWithoutExpressionStatement;
    const ast = parse(source);
    
    await transformAsync(ast, source, {
        fixCount: 1,
        plugins: [
            ['replace', {
                report: () => '',
                fix: (path) => {
                    path.replaceWithMultiple([
                        template.ast('b = 3'),
                        path.node,
                    ]);
                },
                include: () => ['const __a = __b'],
            }],
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.assignInsideBodyWithoutExpressionStatementFix);
    t.end();
});

test('printer: tokenizer: assignment-expression: leading comment: braces', (t) => {
    t.print(fixture.assignLeadingCommentBraces);
    t.end();
});

test('printer: tokenizer: assignment-expression: sequence: leading comment', async (t) => {
    const source = fixture.assignSequenceLeadingComment;
    const ast = parse(source);
    
    await transformAsync(ast, source, {
        plugins: ['extract-sequence-expressions'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.assignSequenceLeadingCommentFix);
    t.end();
});

test('printer: tokenizer: assignment-expression: leading comment', (t) => {
    t.print(fixture.assignLeadingComment);
    t.end();
});
