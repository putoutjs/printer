'use strict';

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
        roundBraceOpen: '(',
        roundBraceClose: ')',
        ...format,
    };
}

function initSemantics(semantics = {}) {
    return {
        comments: true,
        maxSpecifiersInOneLine: 2,
        maxElementsInOneLine: 5,
        ...semantics,
    };
}
