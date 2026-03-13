import {test, stub} from 'supertape';
import {whenTestsEnds} from '#type-checker/when-tests-ends';

test('@putout/printer: type-checker: when-tests-ends: log', (t) => {
    const log = stub();
    const report = stub().returns([0, '# 🌴 Checkers Covered']);
    
    whenTestsEnds({
        log,
        report,
    });
    
    const args = [
        '# 🌴 Checkers Covered',
    ];
    
    t.calledWith(log, args);
    t.end();
});

test('@putout/printer: type-checker: when-tests-ends: code', (t) => {
    const log = stub();
    const report = stub().returns([1, '# 🌴 Checkers Covered']);
    
    const code = whenTestsEnds({
        log,
        report,
    });
    
    t.equal(code, 1);
    t.end();
});
