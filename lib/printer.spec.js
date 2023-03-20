'use strict';

const {test} = require('supertape');
const {print} = require('./printer');
const {parse} = require('putout');

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
                print(' /* [hello world] */= ');
                print('__right');
            },
        },
    });
    
    const expected = 'const {a /* [hello world] */= 5} = b;\n';
    
    t.equal(result, expected);
    t.end();
});
