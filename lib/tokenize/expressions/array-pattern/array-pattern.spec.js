import {fileURLToPath} from 'node:url';
import {dirname} from 'node:path';
import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '../../../printer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const {test, fixture} = createTest(__dirname);

test('printer: tokenizer: array-pattern: space', (t) => {
    const ast = parse(fixture.arrayPatternSpace);
    
    const result = print(ast, {
        format: {
            space: '',
            indent: '',
            newline: '',
            endOfFile: '',
        },
    });
    
    t.equal(result, fixture.arrayPatternSpaceFix);
    t.end();
});

test('printer: tokenizer: array-pattern: max-elements', (t) => {
    t.print(fixture.arrayPatternMaxElements, {
        semantics: {
            maxElementsInOnLine: 5,
        },
    });
    t.end();
});
