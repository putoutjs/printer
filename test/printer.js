'use strict';

const montag = require('montag');

const tryCatch = require('try-catch');

const {test} = require('supertape');
const {parse} = require('putout');

const {readFixtures} = require('./fixture');
const {print} = require('..');

const fixture = readFixtures([
    'arrow',
    'arrow-fix',
    'arrow-block-return',
    'arrow-block-return-fix',
    'string',
    'unknown',
]);

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

test('putout: printer: string', (t) => {
    const ast = parse(fixture.string);
    const source = print(ast);
    
    t.equal(source, fixture.string);
    t.end();
});

test('putout: printer: unknown', (t) => {
    const ast = parse(fixture.unknown, {
        isTS: true,
    });
    const [error] = tryCatch(print, ast);
    
    const expected = montag`
        Node type 'ObjectExpression' is not supported yet: '{
          name,
          password
        }'
    `;
    
    t.equal(error.message, expected);
    t.end();
});

