const {stringify} = JSON;
const escapeValue = (value) => stringify(value)
    .slice(1, -1)
    .replaceAll(`'`, `\\'`);

const getRaw = ({value, raw, extra}) => {
    if (raw)
        return raw;
    
    if (extra?.raw && extra.rawValue === value)
        return extra.raw;
    
    return `'${escapeValue(value)}'`;
};

export const StringLiteral = (path, {write}, semantics) => {
    const {value} = path.node;
    const raw = getRaw(path.node);
    
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
    const result = [];
    
    for (const [index, char] of list.entries()) {
        const prev = list[index - 1];
        
        if (char === quote && prev !== slash) {
            result.push(`${slash}${char}`);
            continue;
        }
        
        result.push(char);
    }
    
    return result.join('');
};
