'use strict';

const isUndefined = (a) => typeof a === 'undefined';

const formatFromList = [
    maybeApplyFromIndent,
    maybeApplyFromSpace,
    maybeApplyFromNewline,
];

module.exports.maybeApplyFromFormat = (source, options) => {
    for (const format of formatFromList)
        source = format(source, options);
    
    return source;
};

function maybeApplyFromIndent(a, options) {
    const indent = options?.format?.indent;
    
    if (!indent)
        return a;
    
    return a.replaceAll(indent, '    ');
}

function maybeApplyFromSpace(a, options) {
    const space = options?.format?.space;
    
    if (!space)
        return a;
    
    return a.replaceAll(space, ' ');
}

function maybeApplyFromNewline(a, options) {
    const newline = options?.format?.newline;
    
    if (isUndefined(newline))
        return a;
    
    return a.replaceAll(newline, '\n');
}
