import {test} from 'supertape';
import montag from 'montag';
import {transform, parse} from 'putout';
import {print} from '#printer';

const {keys} = Object;

test('printer: JSON', (t) => {
    const source = montag`
        __putout_processor_json({
            'hello': 'world',
        });
    `;
    
    const ast = parse(source);
    const options = {};
    const code = print(ast, options);
    
    const expected = montag`
        __putout_processor_json({
            "hello": "world"
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('printer: JSON: do not mutate options', (t) => {
    const source = montag`
        __putout_processor_json({
            'hello': 'world',
        });
    `;
    
    const ast = parse(source);
    const options = {};
    const {length} = keys(options);
    
    print(ast, options);
    
    t.equal(keys(options).length, length, 'looks like options mutated');
    t.end();
});

test('printer: JSON: overrides', (t) => {
    const source = montag`
        __putout_processor_json({
            'hello': 'world',
        });
    `;
    
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            endOfFile: '',
        },
    });
    
    const expected = montag`
        __putout_processor_json({
            "hello": "world"
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('printer: JSON: escapeSingleQuote', (t) => {
    const source = montag`
        __putout_processor_json({
            "hello": "world'abc",
        });
    `;
    
    const ast = parse(source);
    
    const result = print(ast, {
        format: {
            endOfFile: '',
        },
        semantics: {
            escapeSingleQuote: false,
        },
    });
    
    const expected = montag`
        __putout_processor_json({
            "hello": "world'abc"
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('printer: JSON: filesystem: overrides', (t) => {
    const source = montag`
        __putout_processor_filesystem({
            'hello': 'world',
        });
    `;
    
    const ast = parse(source);
    const result = print(ast, {
        format: {
            endOfFile: '',
        },
    });
    
    const expected = montag`
        __putout_processor_filesystem({
            "hello": "world"
        });
    `;
    
    t.equal(result, expected);
    t.end();
});

test('printer: JSON: filesystem: double quotes', (t) => {
    const source = montag`
        __putout_processor_filesystem([
            '/',
            ['/index.js', 'import "./hello" from "world"']
        ]);
    `;
    
    const ast = parse(source);
    const result = print(ast);
    
    const expected = montag`
        __putout_processor_filesystem(["/", ["/index.js", "import \\"./hello\\" from \\"world\\""]]);\n
    `;
    
    t.equal(result, expected);
    t.end();
});

test('printer: JSON: filesystem: double quotes: putout', (t) => {
    const source = montag`
        __putout_processor_filesystem([
            '/',
            ['/package.json', '{"main": "lib/index.js"}'],
        ]);
    `;
    
    const ast = parse(source);
    
    transform(ast, {
        rules: {
            'esm': 'off',
            'esm/resolve-imported-file': 'on',
        },
        plugins: ['esm'],
    });
    
    const code = print(ast);
    
    const expected = montag`
        __putout_processor_filesystem(["/", [
            "/package.json",
            "{\\"main\\": \\"lib/index.js\\"}"
        ]]);\n
    `;
    
    t.equal(code, expected);
    t.end();
});

test('printer: JSON: filesystem: one element', (t) => {
    const source = montag`
        __putout_processor_filesystem({
            "keywords": ["putout"]
        });
    `;
    
    const ast = parse(source);
    const code = print(ast, {
        semantics: {
            maxElementsInOneLine: 0,
        },
    });
    
    const expected = montag`
        __putout_processor_filesystem({
            "keywords": [
                "putout"
            ]
        });\n
    `;
    
    t.equal(code, expected);
    t.end();
});
