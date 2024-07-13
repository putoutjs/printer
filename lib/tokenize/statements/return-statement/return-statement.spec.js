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

test('putout: printer: return-statement: space: function', (t) => {
    const source = 'return (s)=>s.b*n';
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            space: '',
        },
        semantics: {
            roundBraces: true,
        },
    });
    
    const expected = 'return(s)=>s.b*n;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: printer: return-statement: space: function: roundBraces', (t) => {
    const source = 'return (s)=>s.b*n';
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            space: '',
        },
        semantics: {
            roundBraces: true,
        },
    });
    
    const expected = 'return(s)=>s.b*n;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: printer: return-statement: space: function: no roundBraces', (t) => {
    const source = 'return (s)=>s.b*n';
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            space: '',
        },
        semantics: {
            roundBraces: false,
        },
    });
    
    const expected = 'return s=>s.b*n;\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: printer: return statement: sequence: no space, no roundBraces', (t) => {
    const source = 'return (a, b);';
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            space: '',
        },
        semantics: {
            roundBraces: false,
        },
    });
    
    const expected = 'return a,b;\n';
    
    t.equal(result, expected);
    t.end();
});
