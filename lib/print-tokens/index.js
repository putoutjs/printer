'use strict';

const {cook} = require('./cook');

module.exports.printTokens = (tokens) => {
    const cookedTokens = cook(tokens);
    return cookedTokens.join('');
};
