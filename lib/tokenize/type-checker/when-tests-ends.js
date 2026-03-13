import _process from 'node:process';
import {getCoverage as _getCoverage} from './instrument.js';
import {report as _report} from './report.js';

export const whenTestsEnds = (overrides = {}) => {
    const {
        log = console.log,
        process = _process,
        getCoverage = _getCoverage,
        report = _report,
    } = overrides;
    
    const coverage = getCoverage();
    const [code, message] = report(coverage);
    
    log(message);
    
    return code;
};

