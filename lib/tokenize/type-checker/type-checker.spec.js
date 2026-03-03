import {createTest} from '#test';
import {createTypeChecker} from './type-checker.js';

const {test} = createTest(import.meta.url);

test('printer: type-checker', (t) => {
    const isBlockLike = createTypeChecker(['Program', 'BlockStatement']);
    
    const is = isBlockLike({
        type: 'Program',
    });
    
    t.ok(is);
    t.end();
});

test('printer: type-checker: deepness: no parentPath', (t) => {
    const isBlockLike = createTypeChecker('path.parentPath', ['Program', 'BlockStatement']);
    
    const is = isBlockLike({
        type: 'Program',
    });
    
    t.notOk(is);
    t.end();
});

test('printer: type-checker: deepness: parentPath', (t) => {
    const isBlockLike = createTypeChecker('path.parentPath', ['Program', 'BlockStatement']);
    
    const parentPath = {
        type: 'Program',
    };
    
    const is = isBlockLike({
        parentPath,
    });
    
    t.ok(is);
    t.end();
});
