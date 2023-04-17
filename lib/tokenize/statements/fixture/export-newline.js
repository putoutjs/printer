export const toJS = (source) => `${prefix}${source}${sufix}`;
export const fromJS = (source) => {
    const length = source.length - sufix.length;
    const sliced = source.slice(prefix.length, length);
    
    return maybeNewline(removeBlankLines(sliced));
};