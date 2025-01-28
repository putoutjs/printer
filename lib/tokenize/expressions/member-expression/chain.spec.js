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
                        MemberExpression(path) {
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

test('printer: transform: expressions: chain', (t) => {
    const source = montag`
        hello
            .world()
            .abc();
    `;
    
    const root = {
        type: 'ExpressionStatement',
    };
    
    const properties = [{
        type: 'CallExpression',
        name: 'world',
        args: 0,
    }, {
        type: 'CallExpression',
        name: 'abc',
        args: 0,
    }];
    
    const expected = [root, properties];
    
    t.chain(source, expected);
    t.end();
});

test('printer: transform: expressions: chain: IfStatement', (t) => {
    const source = montag`
        if (hello.world().abc())
            z();
    `;
    
    const root = {
        type: 'IfStatement',
    };
    
    const properties = [{
        type: 'CallExpression',
        name: 'world',
        args: 0,
    }, {
        type: 'CallExpression',
        name: 'abc',
        args: 0,
    }];
    
    const expected = [root, properties];
    
    t.chain(source, expected);
    t.end();
});

test('printer: transform: expressions: chain: ReturnStatement', (t) => {
    const source = montag`
         return lines
            .map(cutSpaces(spacesCount))
            .join('\\n');
    `;
    
    const root = {
        type: 'ReturnStatement',
    };
    
    const properties = [{
        type: 'CallExpression',
        name: 'map',
        args: 1,
    }, {
        type: 'CallExpression',
        name: 'join',
        args: 1,
    }];
    
    const expected = [root, properties];
    
    t.chain(source, expected);
    t.end();
});

test('printer: transform: expressions: chain: ArrowFunctionExpression', (t) => {
    const source = montag`
         const isLogical = (path) => path
              .get('argument')
              .isLogicalExpression();
    `;
    
    const root = {
        type: 'ArrowFunctionExpression',
    };
    
    const properties = [{
        type: 'CallExpression',
        name: 'get',
        args: 1,
    }, {
        type: 'CallExpression',
        name: 'isLogicalExpression',
        args: 0,
    }];
    
    const expected = [root, properties];
    
    t.chain(source, expected);
    t.end();
});

test('printer: transform: expressions: chain: VariableDeclarator', (t) => {
    const source = montag`
         const line = rawSource.split('\\n')[startLine];
    `;
    
    const root = {
        type: 'VariableDeclarator',
    };
    
    const properties = [{
        type: 'CallExpression',
        name: 'split',
        args: 1,
    }];
    
    const expected = [root, properties];
    
    t.chain(source, expected);
    t.end();
});

test('printer: transform: expressions: chain: VariableDeclarator: all', (t) => {
    const source = montag`
         const line = rawSource.split('\\n')[startLine];
    `;
    
    const root = {
        type: 'VariableDeclarator',
    };
    
    const properties = [{
        type: 'CallExpression',
        name: 'split',
        args: 1,
    }];
    
    const expected = [
        root,
        properties,
        root,
        properties,
    ];
    
    t.chainAll(source, expected);
    t.end();
});

test('printer: transform: expressions: chain: IfStatement: all', (t) => {
    const source = montag`
        if (bindingPath.get('id').isObjectPattern())
            return;
    `;
    
    const root = {
        type: 'IfStatement',
    };
    
    const properties = [{
        type: 'CallExpression',
        name: 'get',
        args: 1,
    }, {
        type: 'CallExpression',
        name: 'isObjectPattern',
        args: 0,
    }];
    
    const expected = [
        root,
        properties,
        root,
        properties,
    ];
    
    t.chainAll(source, expected);
    t.end();
});

test('printer: transform: expressions: chain: comment', (t) => {
    const source = montag`
        hello
            // .world()
            .abc();
    `;
    
    const root = {
        type: 'ExpressionStatement',
    };
    
    const properties = [{
        type: 'CommentLine',
    }, {
        type: 'CallExpression',
        name: 'abc',
        args: 0,
    }];
    
    const expected = [root, properties];
    
    t.chain(source, expected);
    t.end();
});
