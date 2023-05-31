'use strict';

const {parse} = require('putout');
const {extend} = require('supertape');
const {printExtension} = require('../../../../test/printer');

const {print} = require('../../../printer');

const test = extend({
    print: printExtension,
});

test('putout: printer: return-statement: []', (t) => {
    const source = 'return []';
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    const expected = 'return[];\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: printer: return-statement: {}', (t) => {
    const source = 'return {}';
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    const expected = 'return{};\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: printer: return-statement: () => {}', (t) => {
    const source = 'return() => {}';
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    const expected = 'return()=>{};\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: printer: return-statement: !', (t) => {
    const source = 'return !0';
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            space: '',
        },
    });
    
    const expected = 'return!0;\n';
    
    t.equal(result, expected);
    t.end();
});
