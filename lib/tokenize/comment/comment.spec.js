import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import montag from 'montag';
import {
    parse,
    transform,
    putout,
} from 'putout';
import {types} from '@putout/babel';
import {replaceWithMultiple} from '@putout/operate';
import {createTest} from '#test';
import {print} from '../../printer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {fixture, test} = createTest(__dirname);

const {callExpression} = types;

test('printer: tokenize: comments: top', (t) => {
    t.print(fixture.commentsTop);
    t.end();
});

test('printer: tokenize: comments: class: method', (t) => {
    t.print(fixture.commentClassMethod);
    t.end();
});

test('printer: tokenize: comments: only', (t) => {
    t.print(fixture.commentsOnly);
    t.end();
});

test('printer: tokenize: comments: leading: property', (t) => {
    t.print(fixture.commentLeadingProperty);
    t.end();
});

test('printer: comments: after', (t) => {
    t.print(fixture.commentsAfter);
    t.end();
});

test('printer: comments: couple: trailing', (t) => {
    t.print(fixture.commentCoupleTrailing);
    t.end();
});

test('printer: comments: leading: no newline', (t) => {
    const source = fixture.commentLeadingNoNewline;
    
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, source, {
        rules: {
            'destructuring': 'off',
            'destructuring/apply-object': 'on',
        },
        plugins: ['destructuring'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentLeadingNoNewlineFix);
    t.end();
});

test('printer: comment: inside', (t) => {
    t.print(fixture.commentInside);
    t.end();
});

test('printer: comment: line', (t) => {
    t.print(fixture.commentLine);
    t.end();
});

test('printer: comment: line: multi', (t) => {
    t.print(fixture.commentLineMulti);
    t.end();
});

test('printer: comment: line: after block', (t) => {
    t.print(fixture.commentLineAfterBlock);
    t.end();
});

test('printer: comment: line: innerComments', (t) => {
    const ast = parse(fixture.commentLine, {
        printer: 'putout',
    });
    
    const code = print(ast);
    
    t.equal(code, fixture.commentLineFix);
    t.end();
});

test('printer: comment: block', (t) => {
    t.print(fixture.commentBlock);
    t.end();
});

test('printer: comment: block: interface', (t) => {
    t.print(fixture.commentBlockInterface);
    t.end();
});

test('printer: comments: no loc', (t) => {
    const source = montag`
        'use strict';
        
        const isObject = (a) => a && typeof a === 'object';
        const isString = 'x';
        
        // hello
        const fs = require('fs');
    `;
    
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['nodejs'],
    });
    
    const result = print(ast);
    
    const expected = montag`
        'use strict';
        
        // hello
        const fs = require('node:fs');
        const isString = 'x';
        const isObject = (a) => a && typeof a === 'object';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('printer: comments: no loc: recast', (t) => {
    const source = montag`
        'use strict';
        
        const isObject = (a) => a && typeof a === 'object';
        const isString = 'x';
        
        // hello
        const fs = require('fs');
    `;
    
    const ast = parse(source, {
        printer: 'recast',
    });
    
    transform(ast, source, {
        plugins: ['nodejs'],
    });
    
    const result = print(ast);
    
    const expected = montag`
        'use strict';
        
        // hello
        const fs = require('node:fs');
        const isString = 'x';
        const isObject = (a) => a && typeof a === 'object';\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('printer: comment-next-line', (t) => {
    t.print(fixture.commentNextLine);
    t.end();
});

test('printer: comments: empty program', (t) => {
    t.print(fixture.commentsEmptyProgram);
    t.end();
});

test('printer: comment-inline', (t) => {
    t.print(fixture.commentInline);
    t.end();
});

test('printer: comments: after directive', (t) => {
    t.print(fixture.commentsAfterDirective);
    t.end();
});

test('printer: comments-same-line-transform: transform: recast', (t) => {
    const source = fixture.commentSameLineTransform;
    
    const ast = parse(source, {
        printer: 'recast',
    });
    
    transform(ast, source, {
        rules: {
            'variables': 'off',
            'variables/remove-unused': 'on',
        },
        plugins: ['variables'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentSameLineTransformFix);
    t.end();
});

test('printer: comments: trailing', (t) => {
    t.print(fixture.commentsTrailing);
    t.end();
});

test('printer: comments-same-line-transform: transform', (t) => {
    const source = fixture.commentSameLineTransform;
    
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, source, {
        rules: {
            'variables': 'off',
            'variables/remove-unused': 'on',
        },
        plugins: ['variables'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentSameLineTransformFix);
    t.end();
});

test('printer: comment-same-line', (t) => {
    t.print(fixture.commentSameLine);
    t.end();
});

test('printer: comment-same-line-if', (t) => {
    t.print(fixture.commentSameLineIf);
    t.end();
});

test('printer: comment: shebang-esm', (t) => {
    const {code} = putout(fixture.commentsShebangEsm, {
        printer: 'putout',
    });
    
    t.equal(code, fixture.commentsShebangEsmFix);
    t.end();
});

test('printer: comment: one-line', (t) => {
    t.print(fixture.commentOneLine);
    t.end();
});

test('printer: comment: multiline property', (t) => {
    t.print(fixture.commentMultilineProperty);
    t.end();
});

test('printer: comment: instead params', (t) => {
    t.print(fixture.commentInsteadParams);
    t.end();
});

test('printer: comment: switch', (t) => {
    t.print(fixture.commentSwitch);
    t.end();
});

test('printer: comment: class: decorator', (t) => {
    t.print(fixture.commentClassDecorator);
    t.end();
});

test('printer: comment: class', (t) => {
    t.print(fixture.commentClass);
    t.end();
});

test('printer: comment: class: body', (t) => {
    t.print(fixture.commentClassBody);
    t.end();
});

test('printer: comment: chain', (t) => {
    t.print(fixture.commentChain);
    t.end();
});

test('printer: comment: spread: property', (t) => {
    t.print(fixture.commentSpreadProperty);
    t.end();
});

test('printer: comment: trailing: block', (t) => {
    t.print(fixture.commentTrailingBlock);
    t.end();
});

test('printer: comment: multiline: args', (t) => {
    t.print(fixture.commentMultilineArgs);
    t.end();
});

test('printer: comment: TSInterfaceBody', (t) => {
    t.print(fixture.commentTSInterfaceBody);
    t.end();
});

test('printer: comment: decorator', (t) => {
    t.print(fixture.commentDecorator);
    t.end();
});

test('printer: comment: variableDeclaration', (t) => {
    t.print(fixture.variableDeclaration);
    t.end();
});

test('printer: tokenize: comments: duplicate', (t) => {
    const source = fixture.commentDuplicate;
    const ast = parse(source);
    
    transform(ast, source, {
        rules: {
            'variables': 'off',
            'variables/remove-unused': 'on',
        },
        plugins: ['variables'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentDuplicate);
    t.end();
});

test('printer: tokenize: comments: after', (t) => {
    const source = fixture.commentAfter;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['maybe'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentAfterFix);
    t.end();
});

test('printer: tokenize: comments: after: newline', (t) => {
    const source = fixture.commentAfterNewline;
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['maybe'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentAfterNewlineFix);
    t.end();
});

test('printer: comments: parseTrailingComments: isCommentOnNextLine', (t) => {
    const source = montag`
        push([
            es,
            ax,
            di,
        ]);
        
        // --
        
        pop([
            di,
            ax,
            es,
        ]);
        
        // ---
        
        push(es);
    
    `;
    
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [
            ['split-stack-operations', {
                report: () => ``,
                fix: (path) => {
                    const {callee} = path.node;
                    const [first] = path.get('arguments');
                    const {elements} = first.node;
                    const nodes = [];
                    
                    for (const element of elements) {
                        nodes.push(callExpression(callee, [element]));
                    }
                    
                    replaceWithMultiple(path, nodes);
                },
                
                include: () => [
                    'push(__array)',
                    'pop(__array)',
                ],
            }],
        ],
    });
    
    const result = print(ast);
    
    const expected = montag`
        push(es);
        push(ax);
        push(di);
        // --
        pop(di);
        pop(ax);
        pop(es);
        // ---
        push(es);\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('printer: comment: multiline: arg', (t) => {
    t.print(fixture.commentMultilineArg);
    t.end();
});

test('printer: comment: before-property', (t) => {
    t.print(fixture.commentBeforeProperty);
    t.end();
});

test('printer: comment: chain: newline', (t) => {
    t.print(fixture.commentChainNewline);
    t.end();
});

test('printer: comment: logical', (t) => {
    t.print(fixture.commentLogical);
    t.end();
});

test('printer: comment: method', (t) => {
    t.print(fixture.commentMethod);
    t.end();
});

test('printer: comment: call', (t) => {
    t.print(fixture.commentCall);
    t.end();
});

test('printer: comment: block: trailing', (t) => {
    t.print(fixture.commentBlockTrailing);
    t.end();
});

test('printer: comment: block: trailing: export', (t) => {
    t.print(fixture.commentBlockTrailingExport);
    t.end();
});
