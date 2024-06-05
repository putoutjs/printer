export const files = ['*.json'];

export const toJS = (source) => `${prefix}${source}${suffix}`;
export const fromJS = (source) => {
    const length = source.length - suffix.length;
    const sliced = source.slice(prefix.length, length);
    
    return maybeNewline(removeBlankLines(sliced));
};

export const branch = (rawSource) => {
    const source = toJS(rawSource);
    
    return [{
        startLine: 0,
        source,
    }];
};

export const merge = (rawSource, list) => {
    const [source] = list;
    return fromJS(source);
};