'use strict';

module.exports.StringLiteral = (path, {write}, semantics) => {
    const {value, raw = `'${value}'`} = path.node;
    
    if (path.parentPath.isJSXAttribute()) {
        write(`"${value}"`);
        return;
    }
    
    const newValue = raw.slice(1, -1);
    write.quote();
    write(maybeEscape(newValue, semantics));
    write.quote();
};

const maybeEscape = (value, {escapeDoubleQuote, escapeSingleQuote}) => {
    const list = value.split('');
    const slash = '\\';
    
    if (escapeSingleQuote)
        return escape(list, {
            slash,
            quote: `'`,
        });
    
    if (escapeDoubleQuote)
        return escape(list, {
            slash,
            quote: `"`,
        });
    
    return value;
};

const escape = (list, {slash, quote}) => {
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
