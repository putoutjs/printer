import {parse} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

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
