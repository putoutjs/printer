import {getCoverage as _getCoverage} from '#type-checker/instrument';
import {report as _report} from '#type-checker/report';

export const whenTestsEnds = (overrides = {}) => {
    const {
        log = console.log,
        getCoverage = _getCoverage,
        report = _report,
    } = overrides;
    
    const coverage = getCoverage();
    const [code, message] = report(coverage);
    
    log(message);
    
    return code;
};
