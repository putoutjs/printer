'use strict';

const maybeEncode = (value, {encodeDoubleQuote, encodeSingleQuote}) => {
    if (encodeSingleQuote && !value.includes('\\'))
        return value.replaceAll(`'`, `\\'`);
    
    if (encodeDoubleQuote && !value.includes('\\"'))
        return value.replaceAll(`"`, '\\"');
    
    return value;
};

module.exports.StringLiteral = (path, {write}, semantics) => {
    const {raw, value} = path.node;
    
    if (raw && path.parentPath.isJSXAttribute()) {
        write(raw);
        return;
    }
    
    if (raw) {
        const value = raw.slice(1, -1);
        write.quote();
        write(maybeEncode(value, semantics));
        write.quote();
        
        return;
    }
    
    write.quote();
    write(value);
    write.quote();
};
