'use strict';

const {extend} = require('supertape');
const {printExtension} = require('../../../test/printer');
const {readFixtures} = require('../../../test/fixture');
const fixture = readFixtures(__dirname);

const test = extend({
    print: printExtension,
});

const {parse, transform} = require('putout');

const {print} = require('../../../../printer');
const montag = require('montag');
const putout = require('putout');

test('printer: tokenize: comments: top', (t) => {
    t.print(fixture.commentsTop);
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
        const fs = require('fs');
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
        const fs = require('fs');
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
        plugins: ['remove-unused-variables'],
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
        plugins: ['remove-unused-variables'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentSameLineTransformFix);
    t.end();
});

test('printer: comment-same-line', (t) => {
    t.print(fixture.commentSameLine);
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

test('printer: comment: spread: property', (t) => {
    t.print(fixture.commentSpreadProperty);
    t.end();
});

test('printer: comment: trailing: block', (t) => {
    t.print(fixture.commentTrailingBlock);
    t.end();
});

test('printer: tokenize: comments: duplicate', (t) => {
    const source = fixture.commentDuplicate;
    
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: ['remove-unused-variables'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.commentDuplicate);
    t.end();
});
