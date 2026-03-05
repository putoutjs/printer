import {createTest} from '#test';
import {createTypeChecker} from '#type-checker';
import {getCoverage} from '#type-checker/instrument';

const {test} = createTest(import.meta.url);

test('printer: type-checker: instrument', (t) => {
    const hasFnBody = ({node}) => node.body.body.length;
    const isInsideExportDefaultWithBody = createTypeChecker([
        ['+', hasFnBody],
    ]);
    
    const path = {
        type: 'FunctionDeclaration',
        node: {
            body: {
                body: [1],
            },
        },
    };
    
    isInsideExportDefaultWithBody(path);
    
    const coverage = getCoverage();
    
    t.ok(coverage instanceof Map);
    t.end();
});
