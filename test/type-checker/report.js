import {codeFrameColumns} from '@putout/babel';
import chalk from 'chalk';

const {red} = chalk;

const isFn = (a) => typeof a === 'function';
const difference = (a, b) => new Set(a).difference(new Set(b));

const SUCCESS = 0;
const FAIL = 1;

export const report = (coverage) => {
    const lines = [];
    const log = (a) => lines.push(a);
    let exitCode = SUCCESS;
    
    for (const [name, {length, covered, typeNames}] of coverage) {
        if (length === covered.size)
            continue;
        
        for (const index of difference(fullSet(length), covered)) {
            const currentType = typeNames[index];
            const rawCode = createRawCode(currentType);
            
            const code = codeFrameColumns(rawCode, {}, {
                forceColor: true,
            });
            
            log(`🧨 Uncovered Checkers found with index: ${red(index)}`);
            log(`${code}\n`);
            exitCode = FAIL;
        }
        
        log(`${name}\n`);
    }
    
    if (exitCode === SUCCESS)
        log('# 🌴 Checkers Covered');
    
    return [exitCode, lines.join('\n')];
};

const fullSet = (n) => {
    const result = new Set();
    let i = 0;
    
    do {
        result.add(i++);
    } while (i < n);
    
    return result;
};

function createRawCode(currentType) {
    if (isFn(currentType))
        return currentType.name;
    
    const [operator, fn] = currentType;
    const rawCode = `['${operator}', ${fn.name}]`;
    
    return rawCode;
}
