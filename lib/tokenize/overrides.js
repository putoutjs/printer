'use strict';

module.exports.parseOverrides = (overrides = {}) => {
    const {
        format,
        semantics,
        visitors,
    } = overrides;
    
    return {
        format: {
            ...initFormat(format),
        },
        semantics: {
            ...initSemantics(semantics),
        },
        visitors,
    };
};

function initFormat(format) {
    return {
        indent: '    ',
        newline: '\n',
        space: ' ',
        comments: true,
        splitter: '\n',
        roundBraceOpen: '(',
        roundBraceClose: ')',
        ...format,
    };
}

function initSemantics(semantics = {}) {
    return {
        maxSpecifiersInOneLine: 2,
        ...semantics,
    };
}

