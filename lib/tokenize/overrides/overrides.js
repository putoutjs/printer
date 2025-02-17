'use strict';

const {parseRoundBraces} = require('./parse-round-braces');
const {parseQuotes} = require('./parse-quotes');

module.exports.parseOverrides = (overrides = {}) => {
    const {
        format,
        semantics,
        visitors,
    } = overrides;
    
    const initiatedFormat = initFormat(format);
    
    return {
        format: initiatedFormat,
        semantics: initSemantics(initiatedFormat, semantics),
        visitors,
    };
};

const initFormat = (format) => ({
    indent: '    ',
    newline: '\n',
    space: ' ',
    splitter: '\n',
    quote: `'`,
    endOfFile: '\n',
    ...format,
});

const initSemantics = (format, semantics = {}) => ({
    comments: true,
    maxPropertiesInOneLine: 2,
    maxPropertiesLengthInOneLine: 15,
    maxSpecifiersInOneLine: 2,
    maxElementsInOneLine: 5,
    maxLogicalsInOneLine: 3,
    maxVariablesInOneLine: 4,
    maxTypesInOneLine: 3,
    trailingComma: true,
    ...parseQuotes(format),
    ...semantics,
    roundBraces: parseRoundBraces(semantics),
});
