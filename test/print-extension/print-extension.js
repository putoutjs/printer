import {tryCatch} from 'try-catch';
import {parse} from 'putout';
import {print} from '#printer';
import {maybeApplyFromFormat} from './from.js';

export const printExtension = ({fail, equal}) => (fixture, options) => {
    const cleanFixture = maybeApplyFromFormat(fixture, options);
    
    const [errorParse, ast] = tryCatch(parse, cleanFixture, {
        printer: 'putout',
        isTS: true,
    });
    
    if (errorParse) {
        console.error(errorParse.stack);
        return fail(`☝️Looks like provided fixture cannot be parsed: '${fixture}'`);
    }
    
    const [errorPrint, source] = tryCatch(print, ast, options);
    
    if (errorPrint)
        return fail(errorPrint);
    
    const expected = `${fixture}\n`;
    
    return equal(source, expected);
};
