'use strict';

const montag = require('montag');
const {extend} = require('supertape');
const {parse, transform} = require('putout');

const {chain} = require('./chain');

const noop = () => {};

const test = extend({
    chainAll: (operator) => (source, expected) => {
        return operator.chain(source, expected, {
            all: true,
        });
    },
    chain: (operator) => (source, expected, {all = false} = {}) => {
        const ast = parse(source);
        const result = [];
        
        transform(ast, source, {
            plugins: [
                ['chain', {
                    report: noop,
                    fix: noop,
                    traverse: () => ({
                        LogicalExpression(path) {
                            result.push(...chain(path));
                            !all && path.stop();
                        },
                    }),
                }],
            ],
        });
        
        return operator.deepEqual(result, expected);
    },
});

test('printer: transform: expressions: binary-expression: chain', (t) => {
    const source = montag`
        hello || world
    `;
    
    const root = {
        type: 'ExpressionStatement',
    };
    
    const expected = [
        root,
        2,
        1,
        1,
    ];
    
    t.chain(source, expected);
    t.end();
});

test('printer: transform: expression: binary-expression: chain: IfStatement', (t) => {
    const source = montag`
        if (a || b || c || d)
            z();
    `;
    
    const root = {
        type: 'IfStatement',
    };
    
    const expected = [
        root,
        4,
        3,
        1,
    ];
    
    t.chain(source, expected);
    t.end();
});

test('printer: transform: expressions: binary-expression: chain: VariableDeclarator', (t) => {
    const source = montag`
         const line = a && b && c && d;
    `;
    
    const root = {
        type: 'VariableDeclarator',
    };
    
    const expected = [
        root,
        4,
        3,
        1,
    ];
    
    t.chain(source, expected);
    t.end();
});
