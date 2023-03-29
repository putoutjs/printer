'use strict';

const noop = () => {};
const montag = require('montag');
const tryCatch = require('try-catch');
const {extend} = require('supertape');

const {
    parse,
    transform,
} = require('putout');

const {readFixtures} = require('./fixture');
const {print} = require('..');

const printExtension = ({fail, equal}) => (fixture) => {
    const ast = parse(fixture, {
        isTS: true,
    });
    
    const [error, source] = tryCatch(print, ast);
    
    if (error) {
        console.error(error.stack);
        return fail(error);
    }
    
    const expected = `${fixture}\n`;
    
    return equal(source, expected);
};

const test = extend({
    print: printExtension,
});

module.exports.printExtension = printExtension;

const fixture = readFixtures(__dirname);

test('putout: printer: arrow', (t) => {
    const ast = parse(fixture.arrow);
    const source = print(ast);
    
    t.equal(source, fixture.arrowFix);
    t.end();
});

test('putout: printer: arrow-block-return', (t) => {
    const ast = parse(fixture.arrowBlockReturn);
    const source = print(ast);
    
    t.equal(source, fixture.arrowBlockReturnFix);
    t.end();
});

test('putout: printer: array-expression', (t) => {
    t.print(fixture.arrayExpression);
    t.end();
});

test('putout: printer: array-expression: couple lines', (t) => {
    t.print(fixture.arrayExpressionCoupleLines);
    t.end();
});

test('putout: printer: array-expression-two', (t) => {
    t.print(fixture.arrayExpressionTwo);
    t.end();
});

test('putout: printer: array-pattern', (t) => {
    t.print(fixture.arrayPattern);
    t.end();
});

test('putout: printer: arrow-function', (t) => {
    t.print(fixture.arrowFunction);
    t.end();
});

test('putout: printer: assignment-expression', (t) => {
    t.print(fixture.assignmentExpression);
    t.end();
});

test('putout: printer: assignment-pattern', (t) => {
    t.print(fixture.assignmentPattern);
    t.end();
});

test('putout: printer: await-expression', (t) => {
    t.print(fixture.awaitExpression);
    t.end();
});

test('putout: printer: block-statement', (t) => {
    t.print(fixture.blockStatement);
    t.end();
});

test('putout: printer: conditionalExpression', (t) => {
    t.print(fixture.conditionalExpression);
    t.end();
});

test('putout: printer: computed', (t) => {
    t.print(fixture.computed);
    t.end();
});

test('putout: printer: call-expression', (t) => {
    t.print(fixture.callExpression);
    t.end();
});

test('putout: printer: call-expression + empty object', (t) => {
    const source = fixture.callExpressionEmptyObject;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            'eslint',
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.callExpressionEmptyObjectFix);
    t.end();
});

test('putout: printer: continue', (t) => {
    t.print(fixture.continue);
    t.end();
});

test('putout: printer: comment', (t) => {
    t.print(fixture.comment);
    t.end();
});

test('putout: printer: comment-inside', (t) => {
    t.print(fixture.commentInside);
    t.end();
});

test('putout: printer: destructuring', (t) => {
    t.print(fixture.destructuring);
    t.end();
});

test('putout: printer: exportDefaultDeclaration', (t) => {
    t.print(fixture.exportDefaultDeclaration);
    t.end();
});

test('putout: printer: exportDefaultFirst', (t) => {
    t.print(fixture.exportDefaultFirst);
    t.end();
});

test('putout: printer: for-statement', (t) => {
    t.print(fixture.forStatement);
    t.end();
});

test('putout: printer: for-in-statement', (t) => {
    t.print(fixture.forInStatement);
    t.end();
});

test('putout: printer: for-of', (t) => {
    t.print(fixture.forOf);
    t.end();
});

test('putout: printer: for-of: one', (t) => {
    t.print(fixture.forOfOne);
    t.end();
});

test('putout: printer: for-of: body', (t) => {
    t.print(fixture.forOfBody);
    t.end();
});

test('putout: printer: for-of: entries', (t) => {
    t.print(fixture.forOfEntries);
    t.end();
});

test('putout: printer: for-of-var-pattern', (t) => {
    t.print(fixture.forOfVarPattern);
    t.end();
});

test('putout: printer: function-declaration', (t) => {
    t.print(fixture.functionDeclaration);
    t.end();
});

test('putout: printer: import-declaration', (t) => {
    t.print(fixture.importDeclaration);
    t.end();
});

test('putout: printer: if', (t) => {
    t.print(fixture.if);
    t.end();
});

test('putout: printer: logicalExpression', (t) => {
    t.print(fixture.logicalExpression);
    t.end();
});

test('putout: printer: MetaProperty', (t) => {
    t.print(fixture.metaProperty);
    t.end();
});

test('putout: printer: new', (t) => {
    t.print(fixture.new);
    t.end();
});

test('putout: printer: numericLiteral', (t) => {
    t.print(fixture.numericLiteral);
    t.end();
});

test('putout: printer: numericLiteral: no raw', (t) => {
    const source = 'const b = a * a';
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            ['math', {
                report: noop,
                replace: () => ({
                    '__a * __a': '__a ** 2',
                }),
            }],
        ],
    });
    
    const result = print(ast);
    const expected = fixture.numericLiteral + '\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: printer: variableDeclaration', (t) => {
    t.print(fixture.variableDeclaration);
    t.end();
});

test('putout: printer: object-method', (t) => {
    t.print(fixture.objectMethod);
    t.end();
});

test('putout: printer: object-expression', (t) => {
    t.print(fixture.objectExpression);
    t.end();
});

test('putout: printer: optional-call-expression', (t) => {
    t.print(fixture.optionalCallExpression);
    t.end();
});

test('putout: printer: reg-exp-literal', (t) => {
    t.print(fixture.RegExpLiteral);
    t.end();
});

test('putout: printer: string', (t) => {
    t.print(fixture.string);
    t.end();
});

test('putout: printer: string-literal', (t) => {
    t.print(fixture.stringLiteral);
    t.end();
});

test('putout: printer: try-catch-statement', (t) => {
    t.print(fixture.tryCatchStatement);
    t.end();
});

test('putout: printer: this-expression', (t) => {
    t.print(fixture.thisExpression);
    t.end();
});

test('putout: printer: unary-expression', (t) => {
    t.print(fixture.unaryExpression);
    t.end();
});

test('putout: printer: var-couple-lines', (t) => {
    t.print(fixture.varCoupleLines);
    t.end();
});

test('putout: printer: ObjectPattern', (t) => {
    t.print(fixture.objectPattern);
    t.end();
});

test('putout: printer: shebang', (t) => {
    t.print(fixture.shebang);
    t.end();
});

test('putout: printer: switch-statement', (t) => {
    t.print(fixture.switchStatement);
    t.end();
});

test('putout: printer: tagged-template-expression', (t) => {
    t.print(fixture.taggedTemplateExpression);
    t.end();
});

test('putout: printer: template', (t) => {
    t.print(fixture.template);
    t.end();
});

test('putout: printer: unknown', (t) => {
    const ast = parse(fixture.unknown, {
        isTS: true,
    });
    
    const [error] = tryCatch(print, ast);
    
    const expected = montag`
        Node type 'TSTypeAliasDeclaration' is not supported yet: 'type User = {
          name: string;
          password: string;
        };'
    `;
    
    t.equal(error.message, expected);
    t.end();
});

test('putout: printer: spread-element', (t) => {
    t.print(fixture.spreadElement);
    t.end();
});

test('putout: printer: yield-expression', (t) => {
    t.print(fixture.yieldExpression);
    t.end();
});

test('putout: printer: while-statement', (t) => {
    t.print(fixture.whileStatement);
    t.end();
});
