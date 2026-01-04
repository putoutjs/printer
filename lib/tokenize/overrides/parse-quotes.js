export const parseQuotes = ({quote}) => {
    if (quote === '"')
        return {
            escapeSingleQuote: false,
            escapeDoubleQuote: true,
        };
    
    return {
        escapeSingleQuote: true,
        escapeDoubleQuote: false,
    };
};
