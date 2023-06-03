'use strict';

const tryCatch = require('try-catch');
const {parse} = require('putout');
const {print} = require('../../lib/printer');
const {maybeApplyFromFormat} = require('./from');

module.exports.printExtension = ({fail, equal}) => (fixture, options) => {
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
    
    if (errorPrint) {
        return fail(errorPrint);
    }
    
    const expected = `${fixture}\n`;
    
    return equal(source, expected);
};
