import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('putout: printer: statement: program: directive', (t) => {
    t.print(fixture.programDirective);
    t.end();
});

test('putout: printer: statement: program: endOfFile', (t) => {
    const ast = parse(fixture.programEndOfFile);
    const result = print(ast, {
        format: {
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.programEndOfFile);
    t.end();
});
