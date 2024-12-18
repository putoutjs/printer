'use strict';

const {parseRoundBraces} = require('./parse-round-braces');

module.exports.parseOverrides = (overrides = {}) => {
    const {
        format,
        semantics,
        visitors,
    } = overrides;
    
    return {
        format: initFormat(format),
        semantics: initSemantics(semantics),
        visitors,
    };
};

function initFormat(format) {
    return {
        indent: '    ',
        newline: '\n',
        space: ' ',
        splitter: '\n',
        quote: `'`,
        endOfFile: '\n',
        ...format,
    };
}

function initSemantics(semantics = {}) {
    return {
        comments: true,
        maxPropertiesInOneLine: 2,
        maxPropertiesLengthInOneLine: 15,
        maxSpecifiersInOneLine: 2,
        maxElementsInOneLine: 5,
        maxLogicalsInOneLine: 3,
        maxVariablesInOneLine: 4,
        maxTypesInOneLine: 3,
        trailingComma: true,
        encodeSingleQuote: true,
        encodeDoubleQuote: false,
        ...semantics,
        roundBraces: parseRoundBraces(semantics),
    };
}
