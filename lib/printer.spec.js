'use strict';

const putout = require('putout');
const montag = require('montag');

const tryCatch = require('try-catch');
const {extend} = require('supertape');
const {print} = require('./printer');
const acorn = require('acorn');
const estreeToBabel = require('estree-to-babel');

const {
    parse,
    transform,
    traverse,
} = putout;

const {readFixtures} = require('../test/fixture');
const {printExtension} = require('../test/printer');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

test('printer: override', (t) => {
    const ast = parse('const {a = 5} = b');
    
    const result = print(ast, {
        visitors: {
            AssignmentPattern(path, {print}) {
                print('/* [hello world] */= ');
                print('__right');
            },
        },
    });
    
    const expected = 'const {a/* [hello world] */= 5} = b;\n';
    
    t.equal(result, expected);
    t.end();
});

test('printer: maybe.print.space', (t) => {
    const ast = parse('const {a = 5} = b');
    
    const result = print(ast, {
        visitors: {
            AssignmentPattern(path, {maybe, print}) {
                maybe.print.space(true);
                print('/* [hello world] */= ');
                print('__right');
                maybe.print.space(false);
            },
        },
    });
    
    const expected = 'const {a /* [hello world] */= 5} = b;\n';
    
    t.equal(result, expected);
    t.end();
});

test('printer: override: maximum stack size', (t) => {
    const ast = parse('const {a = 5} = b');
    
    const result = print(ast, {
        visitors: {
            AssignmentPattern(path, {print}) {
                print(path);
                print('/* [hello world] */= ');
                print('__right');
            },
        },
    });
    
    const expected = 'const {a/* [hello world] */= 5} = b;\n';
    
    t.equal(result, expected);
    t.end();
});

test('printer: is: isProgram', (t) => {
    const source = 'for (const x of Array.from(y)) {}';
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            'for-of',
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, '{}\n');
    t.end();
});

test('printer: transform: for-of: BlockStatement', (t) => {
    const source = fixture.forOfBlock;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            'for-of',
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.forOfBlockFix);
    t.end();
});

test('printer: transform: for-of: Identifier', (t) => {
    const source = fixture.forOfIdentifier;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            'for-of',
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.forOfIdentifierFix);
    t.end();
});

test('printer: transform: no File, no Program', (t) => {
    const result = print({
        type: 'Identifier',
        name: 'hello',
    });
    
    const expected = 'hello;\n';
    
    t.equal(result, expected);
    t.end();
});

test('printer: transform: no File', (t) => {
    const result = print({
        type: 'Program',
        body: [{
            type: 'ExpressionStatement',
            expression: {
                type: 'Identifier',
                name: 'hello',
            },
        }],
    });
    
    const expected = 'hello;\n';
    
    t.equal(result, expected);
    t.end();
});

test('printer: nested-object', (t) => {
    t.print(fixture.nestedObject);
    t.end();
});

test('printer: comment: one-line', (t) => {
    t.print(fixture.commentOneLine);
    t.end();
});

test('printer: empty-statement: no', (t) => {
    const ast = parse('console.log(hello);');
    const result = print(ast);
    const expected = 'console.log(hello);\n';
    
    t.equal(result, expected);
    t.end();
});

test('printer: empty-statement', (t) => {
    t.print(fixture.emptyStatement);
    t.end();
});

test('printer: transform: acorn: call-expression: parent ExpressionStatement', (t) => {
    const source = fixture.callExpressionParentExpression;
    
    const ast = estreeToBabel(acorn.parse(source, {
        ecmaVersion: 2023,
    }));
    
    transform(ast, source, {
        plugins: [
            'declare',
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.callExpressionParentExpressionFix);
    t.end();
});

test('printer: override: indent: different before in and out from visitor', (t) => {
    const ast = parse('const {a = 5} = b');
    
    const [error] = tryCatch(print, ast, {
        visitors: {
            AssignmentPattern(path, {indent}) {
                indent.inc();
                indent.inc();
            },
        },
    });
    
    const expected = `☝️Looks like indent level changed after token visitor: 'AssignmentPattern', for code: 'a = 5'`;
    
    t.equal(error?.message, expected);
    t.end();
});

test('printer: comment-same-line', (t) => {
    t.print(fixture.commentSameLine);
    t.end();
});

test('printer: comments-same-line-transform: transform', (t) => {
    const source = fixture.commentSameLineTransform;
    
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, source, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentSameLineTransformFix);
    t.end();
});

test('printer: comments-same-line-transform: transform: recast', (t) => {
    const source = fixture.commentSameLineTransform;
    
    const ast = parse(source, {
        printer: 'recast',
    });
    
    transform(ast, source, {
        plugins: [
            'remove-unused-variables',
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentSameLineTransformFix);
    t.end();
});

test('printer: trailing comments', (t) => {
    t.print(fixture.trailingComments);
    t.end();
});

test('printer: comment-next-line', (t) => {
    t.print(fixture.commentNextLine);
    t.end();
});

test('printer: comment-inline', (t) => {
    t.print(fixture.commentInline);
    t.end();
});

test('printer: transform: Literal: no extra', async (t) => {
    const escover = await import('escover/plugin');
    const source = fixture.literalNoExtra;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            ['escover', escover],
        ],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.literalNoExtraFix);
    t.end();
});

test('printer: override: format: minify', (t) => {
    const ast = parse(montag`
        const a = 5; // hello
        const b = 6; // world
        const c = a + b; // sum
    `);
    
    const result = print(ast, {
        format: {
            indent: '',
            newline: '',
            space: '',
            comments: false,
        },
    });
    
    const expected = 'const a=5;const b=6;const c=a+b;';
    
    t.equal(result, expected);
    t.end();
});

test('printer: comments: after', (t) => {
    t.print(fixture.commentsAfter);
    t.end();
});

test('printer: comment: inside', (t) => {
    t.print(fixture.commentInside);
    t.end();
});

test('printer: comment: shebang-esm', (t) => {
    const {code} = putout(fixture.shebangEsm, {
        printer: 'putout',
    });
    
    t.equal(code, fixture.shebangEsmFix);
    t.end();
});

test('printer: comment: block: comments', (t) => {
    t.print(fixture.commentBlock);
    t.end();
});

test('printer: comment: block: innerComments', (t) => {
    const ast = parse(fixture.commentBlock, {
        printer: 'putout',
    });
    
    const code = print(ast);
    
    t.equal(code, fixture.commentBlockFix);
    t.end();
});

test('printer: path: ', (t) => {
    const ast = parse('const a = 5;');
    let path;
    
    traverse(ast, {
        VariableDeclaration(p) {
            path = p;
            p.stop();
        },
    });
    
    const code = print(path);
    
    t.equal(code, 'const a = 5;');
    t.end();
});
