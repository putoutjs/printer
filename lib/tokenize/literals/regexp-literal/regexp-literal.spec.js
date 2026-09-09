import {parse, transform} from 'putout';
import {createTest} from '#test';
import {print} from '#printer';

const {test, fixture} = createTest(import.meta.url);

test('printer: tokenize: literals: regexp', (t) => {
    const source = fixture.regexp;
    
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, {
        plugins: ['regexp'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.regexpFix);
    t.end();
});

test('printer: tokenize: literals: regexp: no raw', (t) => {
    const source = fixture.regexpNoRaw;
    const ast = parse(source, {
        printer: 'putout',
    });
    
    transform(ast, {
        plugins: ['tape'],
    });
    
    const result = print(ast);
    
    t.equal(result, fixture.regexpNoRawFix);
    t.end();
});
