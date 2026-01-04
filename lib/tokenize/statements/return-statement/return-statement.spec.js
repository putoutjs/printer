import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

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

test('putout: printer: return: chain', (t) => {
    t.print(fixture.returnChain);
    t.end();
});

test('putout: printer: return: label', (t) => {
    t.print(fixture.returnLabel);
    t.end();
});
