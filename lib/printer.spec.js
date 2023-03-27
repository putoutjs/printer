'use strict';

const {test} = require('supertape');
const {print} = require('./printer');
const {parse, transform} = require('putout');

test('printer: override', (t) => {
    const ast = parse('const {a = 5} = b');
    const result = print(ast, {
        visitors: {
            AssignmentPattern(path, {print}) {
                print(' /* [hello world] */= ');
                print('__right');
            },
        },
    });
    
    const expected = 'const {a /* [hello world] */= 5} = b;';
    
    t.equal(result, expected);
    t.end();
});

test('printer: override: maximum stack size', (t) => {
    const ast = parse('const {a = 5} = b');
    const result = print(ast, {
        visitors: {
            AssignmentPattern(path, {print}) {
                print(path);
                print(' /* [hello world] */= ');
                print('__right');
            },
        },
    });
    
    const expected = 'const {a /* [hello world] */= 5} = b;';
    
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
