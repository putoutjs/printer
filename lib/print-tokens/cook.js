export const cook = (tokens) => {
    const cookedTokens = [];
    
    for (const {value} of tokens) {
        cookedTokens.push(value);
    }
    
    return cookedTokens;
};
