import montag from 'montag';
import {extend} from 'supertape';
import {parse, transform} from 'putout';
import {chain} from './chain.js';

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
        
        transform(ast, {
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

test('printer: transform: expressions: binary-expression: chain: different', (t) => {
    const source = montag`
        const isIndent = isFirst(path)
            || !looksLikeSwitchCase
            && !path.isClassMethod()
            && !insideFn
            && !propIs;
    `;
    
    const root = {
        type: 'VariableDeclarator',
    };
    
    const expected = [
        root,
        5,
        4,
        1,
    ];
    
    t.chain(source, expected);
    t.end();
});
