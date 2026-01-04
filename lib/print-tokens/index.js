import {cook} from './cook.js';

export const printTokens = (tokens) => {
    const cookedTokens = cook(tokens);
    return cookedTokens.join('');
};
