'use strict';

const encode = (list, {slash, quote}) => {
    const res = [];
    
    for (const [index, char] of list.entries()) {
        const prev = list[index - 1];
        
        if (char === quote && prev !== slash) {
            res.push(`${slash}${char}`);
            continue;
        }
        
        res.push(char);
    }
    
    return res.join('');
};

const maybeEncode = (value, {encodeDoubleQuote, encodeSingleQuote}) => {
    const list = value.split('');
    const slash = '\\';
    
    if (encodeSingleQuote)
        return encode(list, {
            slash,
            quote: `'`,
        });
    
    if (encodeDoubleQuote)
        return encode(list, {
            slash,
            quote: `"`,
        });
    
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

