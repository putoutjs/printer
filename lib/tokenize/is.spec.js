'use strict';

const {test} = require('supertape');
const montag = require('montag');
const {__filesystem_name} = require('@putout/operator-json');
const {parse, transform} = require('putout');
const {print} = require('../printer');
const noop = () => {};

test('printer: is: isIndented: putout: scan', (t) => {
    const addFile = {
        report: () => 'Add file',
        fix: noop,
        scan: noop,
    };
    
    const source = montag`
        ${__filesystem_name}([
            '/home/coderaiser/putout/',
            '/home/coderaiser/putout/README.md',
        ]);
    `;
    
    const ast = parse(source);
    
    transform(ast, source, {
        plugins: [{
            'add-file': addFile,
        }],
    });
    
    const result = print(ast);
    const expected = `${__filesystem_name}(["/home/coderaiser/putout/", "/home/coderaiser/putout/README.md"]);\n`;
    
    t.equal(result, expected);
    t.end();
});
