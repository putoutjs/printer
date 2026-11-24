import {parse, transform} from 'putout';
import {montag} from 'montag';
import {types} from '@putout/babel';
import {createTest} from '#test';
import {print} from '#printer';

const {fixture, test} = createTest(import.meta.url);
const noop = () => {};
const {objectExpression} = types;

test('printer: tokenizer: object-expression', (t) => {
    t.print(fixture.objectExpression);
    t.end();
});

test('printer: tokenizer: object-expression: call', (t) => {
    t.print(fixture.objectExpressionCall);
    t.end();
});

test('printer: tokenizer: object-expression: comment: inside', (t) => {
    t.print(fixture.objectExpressionCommentInside);
    t.end();
});

test('printer: tokenizer: object-expression: space', (t) => {
    t.print(fixture.objectExpressionSpace, {
        format: {
            space: '_',
        },
    });
    t.end();
});

test('printer: tokenizer: object-expression: comment', (t) => {
    const source = fixture.objectExpressionComment;
    const ast = parse(source);
    
    transform(ast, {
        rules: {
            'variables': 'off',
            'variables/remove-unused': 'on',
        },
        plugins: ['variables'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.objectExpressionCommentFix);
    t.end();
});

test('printer: tokenizer: object-expression: parens', (t) => {
    const source = montag`
        const a = () => b;
    `;
    
    const ast = parse(source);
    
    transform(ast, {
        plugins: [
            ['object', {
                report: noop,
                fix: (path) => {
                    path.replaceWith(objectExpression([]));
                },
                traverse: ({push}) => ({
                    '() => b': (path) => {
                        push(path.get('body'));
                    },
                }),
            }],
        ],
    });
    
    const result = print(ast);
    const expected = 'const a = () => ({});\n';
    
    t.equal(result, expected);
    t.end();
});

test('printer: tokenizer: object-expression: param', (t) => {
    t.print(fixture.objectExpressionParam);
    t.end();
});

test('printer: tokenizer: object-expression: spread: logical', (t) => {
    t.print(fixture.objectSpreadLogical);
    t.end();
});

test('printer: tokenizer: object-expression: nested call', (t) => {
    t.print(fixture.objectExpressionNestedCall);
    t.end();
});

test('printer: tokenizer: object-expression: inside array: with boolean', (t) => {
    t.print(fixture.objectInsideArrayWithBoolean);
    t.end();
});

test('printer: tokenizer: object-expression: as const', (t) => {
    t.print(fixture.objectAsConst);
    t.end();
});

test('printer: tokenizer: object-expression: inside array', (t) => {
    t.print(fixture.objectExpressionInsideArray);
    t.end();
});

test('printer: tokenizer: object-expression: shorthand', (t) => {
    t.print(fixture.objectExpressionShorthand);
    t.end();
});

test('printer: tokenizer: object-expression: third inside array', (t) => {
    t.print(fixture.objectThirdInsideArray);
    t.end();
});

test('printer: tokenizer: object-expression: as any', (t) => {
    t.print(fixture.objectAsAny);
    t.end();
});

test('printer: tokenizer: object-expression: spread first', (t) => {
    const from = fixture.objectExpressionSpreadFirst;
    const ast = parse(from);
    const result = print(ast);
    
    t.equal(result, fixture.objectExpressionSpreadFirstFix);
    t.end();
});

test('printer: tokenizer: object-expression: no-trailing-comma', (t) => {
    t.print(fixture.objectExpressionNoTrailingComma, {
        semantics: {
            trailingComma: false,
        },
    });
    t.end();
});

test('printer: tokenizer: object-expression: method: no-trailing-comma', (t) => {
    t.print(fixture.objectExpressionMethodNoTrailingComma, {
        semantics: {
            trailingComma: false,
        },
    });
    t.end();
});

test('printer: tokenizer: object-expression: inside-assign', (t) => {
    const source = fixture.objectInsideAssign;
    const ast = parse(source);
    
    const result = print(ast);
    const expected = fixture.objectInsideAssignFix;
    
    t.equal(result, expected);
    t.end();
});

test('putout: printer: object-expression: property: comment: line', (t) => {
    t.print(fixture.propertyCommentLine);
    t.end();
});

test('putout: printer: object-expression: property: comment: couple', (t) => {
    t.print(fixture.propertyCommentCouple);
    t.end();
});

test('putout: printer: object-expression: property: comment: block', (t) => {
    t.print(fixture.propertyCommentBlock);
    t.end();
});

test('putout: printer: object-expression: property: comment: block-multiline', (t) => {
    t.print(fixture.propertyCommentBlockMultiline);
    t.end();
});

test('putout: printer: object-expression: property: comment: spread', (t) => {
    t.print(fixture.propertyCommentSpread);
    t.end();
});

test('putout: printer: object-expression: method: comment: trailing', (t) => {
    t.print(fixture.methodCommentTrailing);
    t.end();
});

test('putout: printer: object-expression: method: comment: leading', (t) => {
    t.print(fixture.methodCommentLeading);
    t.end();
});

test('putout: printer: object-expression: method: comment: trailing: last', (t) => {
    t.print(fixture.methodCommentTrailingLast);
    t.end();
});

test('putout: printer: object-expression: spread: comment: trailing', (t) => {
    t.print(fixture.spreadCommentTrailing);
    t.end();
});

test('putout: printer: object-expression: spread: comment: leading', (t) => {
    t.print(fixture.spreadCommentLeading);
    t.end();
});

test('putout: printer: object-expression: property: comment: block: same line', (t) => {
    t.print(fixture.propertyCommentBlockSameLine);
    t.end();
});

test('putout: printer: object-expression: property: comment: block: same line: multiline', (t) => {
    const ast = parse(fixture.propertyCommentBlockSameLineMultiline);
    const result = print(ast);
    
    t.equal(result, `${fixture.propertyCommentBlockSameLineMultilineFix}\n`);
    t.end();
});

test('putout: printer: object-expression: property: comment: block: same line: couple', (t) => {
    t.print(fixture.propertyCommentBlockSameLineCouple);
    t.end();
});

test('putout: printer: object-expression: property: comment: block: couple: own', (t) => {
    t.print(fixture.propertyCommentBlockCoupleOwn);
    t.end();
});

test('putout: printer: object-expression: property: comment: line: no loc', (t) => {
    const ast = parse(fixture.propertyCommentLine);
    const [{declarations}] = ast.program.body;
    const [{init}] = declarations;
    
    for (const property of init.properties)
        delete property.loc;
    
    const result = print(ast);
    
    t.equal(result, `${fixture.propertyCommentLine}\n`);
    t.end();
});

test('putout: printer: object-expression: property: comment: block: same line: prev no loc', (t) => {
    const ast = parse(fixture.propertyCommentBlockSameLine);
    const [{declarations}] = ast.program.body;
    const [{init}] = declarations;
    const [first] = init.properties;
    
    delete first.loc;
    
    const result = print(ast);
    
    t.equal(result, `${fixture.propertyCommentBlockSameLineNoLocFix}\n`);
    t.end();
});
