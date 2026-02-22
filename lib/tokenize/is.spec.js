import {test} from 'supertape';
import montag from 'montag';
import {__filesystem_name} from '@putout/operator-json';
import {parse, transform} from 'putout';
import {print} from '#printer';

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
    
    transform(ast, {
        plugins: [{
            'add-file': addFile,
        }],
    });
    
    const result = print(ast);
    const expected = `${__filesystem_name}(["/home/coderaiser/putout/", "/home/coderaiser/putout/README.md"]);\n`;
    
    t.equal(result, expected);
    t.end();
});
