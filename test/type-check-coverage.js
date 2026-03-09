import {callWhenTestsEnds} from 'supertape';
import {getCoverage} from '#type-checker/instrument';
import {report} from '#type-checker/report';

callWhenTestsEnds('TYPE_CHECK', () => {
    const coverage = getCoverage();
    const [code, output] = report(coverage);
    
    console.log(output);
    
    return code;
});
