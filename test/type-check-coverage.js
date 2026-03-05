import process from 'node:process';
import {isOnlyTests} from 'supertape';
import {getCoverage} from '#type-checker/instrument';
import {report} from './type-checker/report.js';

if (process.env.TYPE_CHECK)
    process.on('exit', () => {
        if (isOnlyTests())
            return;
        
        const coverage = getCoverage();
        const [code, output] = report(coverage);
        
        console.log(output);
        process.exitCode = code;
    });
