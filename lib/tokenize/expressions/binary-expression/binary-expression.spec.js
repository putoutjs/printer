import {parse, transform} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenizer: binary-expression: parens', (t) => {
    t.print(fixture.binaryExpressionParens);
    t.end();
});

test('printer: tokenizer: binary-expression: string', (t) => {
    t.print(fixture.binaryExpressionString);
    t.end();
});

test('printer: tokenizer: binary-expression: minus', (t) => {
    t.print(fixture.binaryExpressionMinus);
    t.end();
});

test('printer: tokenizer: binary-expression: space', (t) => {
    const ast = parse(fixture.binaryExpressionSpace);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.binaryExpressionSpaceFix);
    t.end();
});

test('printer: tokenizer: binary-expression: unary', (t) => {
    const ast = parse(fixture.binaryExpressionUnary);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.binaryExpressionUnaryFix);
    t.end();
});

test('printer: tokenizer: binary-expression: in', (t) => {
    const ast = parse(fixture.binaryExpressionIn);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    t.equal(result, fixture.binaryExpressionInFix);
    t.end();
});

test('printer: tokenizer: binary-expression: less', (t) => {
    const ast = parse(fixture.binaryExpressionLess);
    
    transform(ast, {
        rules: {
            'return': 'off',
            'return/remove-useless': 'on',
        },
        plugins: ['return'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionLessFix);
    t.end();
});

test('printer: tokenizer: binary-expression: return', (t) => {
    t.print(fixture.binaryExpressionReturn);
    t.end();
});

test('printer: tokenizer: binary-expression: couple', (t) => {
    const ast = parse(fixture.binaryCouple);
    
    transform(ast, {
        plugins: ['conditions'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.binaryCoupleFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: block', (t) => {
    t.print(fixture.binaryExpressionCommentBlock);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: line', (t) => {
    t.print(fixture.binaryExpressionCommentLine);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: line: logical', (t) => {
    t.print(fixture.binaryExpressionCommentLogical);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: line: assignment', (t) => {
    t.print(fixture.binaryExpressionCommentAssignment);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: line: arrow', (t) => {
    t.print(fixture.binaryExpressionCommentArrow);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: block: inside function', (t) => {
    t.print(fixture.binaryExpressionCommentBlockFn);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: block: arrow', (t) => {
    t.print(fixture.binaryExpressionCommentBlockArrow);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: line: logical: no loc', (t) => {
    const ast = parse(fixture.binaryExpressionCommentLogical);
    const [{expression}] = ast.program.body;
    
    delete expression.right.left.loc;
    
    const result = print(ast);
    
    t.equal(result, `${fixture.binaryExpressionCommentLogical}\n`);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: logical line', (t) => {
    const ast = parse(fixture.binaryExpressionGapLogicalLine);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapLogicalLineFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: logical line: idempotent', (t) => {
    const ast = parse(fixture.binaryExpressionGapLogicalLineFix);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapLogicalLineFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: logical own', (t) => {
    const ast = parse(fixture.binaryExpressionGapLogicalOwn);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapLogicalOwnFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: logical own: idempotent', (t) => {
    const ast = parse(fixture.binaryExpressionGapLogicalOwnFix);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapLogicalOwnFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: arith', (t) => {
    const ast = parse(fixture.binaryExpressionGapArith);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapArithFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: arith: idempotent', (t) => {
    const ast = parse(fixture.binaryExpressionGapArithFix);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapArithFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: call', (t) => {
    const ast = parse(fixture.binaryExpressionGapCall);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapCallFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: call: idempotent', (t) => {
    const ast = parse(fixture.binaryExpressionGapCallFix);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapCallFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: compare', (t) => {
    const ast = parse(fixture.binaryExpressionGapCompare);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapCompareFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: compare: idempotent', (t) => {
    const ast = parse(fixture.binaryExpressionGapCompareFix);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapCompareFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: mixed', (t) => {
    const ast = parse(fixture.binaryExpressionGapMixed);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapMixedFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: mixed: idempotent', (t) => {
    const ast = parse(fixture.binaryExpressionGapMixedFix);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapMixedFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: after operator', (t) => {
    const ast = parse(fixture.binaryExpressionGapAfterOperator);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapAfterOperatorFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: after operator: idempotent', (t) => {
    const ast = parse(fixture.binaryExpressionGapAfterOperatorFix);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapAfterOperatorFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: return', (t) => {
    const ast = parse(fixture.binaryExpressionGapReturn);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapReturnFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: return: idempotent', (t) => {
    const ast = parse(fixture.binaryExpressionGapReturnFix);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapReturnFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: paren', (t) => {
    const ast = parse(fixture.binaryExpressionGapParen);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapParenFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: gap: paren: idempotent', (t) => {
    const ast = parse(fixture.binaryExpressionGapParenFix);
    const result = print(ast);
    
    t.equal(result, fixture.binaryExpressionGapParenFix);
    t.end();
});

test('printer: tokenizer: binary-expression: comment: property', (t) => {
    t.print(fixture.binaryExpressionCommentProperty);
    t.end();
});
