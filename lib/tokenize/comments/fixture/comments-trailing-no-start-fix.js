'use strict';

const {
    operator,
    putout,
    compare,
} = require('putout');
// https://git.io/JqcMn
const {extract, toJS} = operator;;
module.exports.report = () => `Use 'if condition' instead of 'ternary expression'`;

module.exports.match = () => ({
    'codeblock("json", __a)': (vars, path) => {
        const prev = path.getPrevSibling();
        return compare(prev, 'heading(2, "Configuration")');
    },
});

module.exports.replace = () => ({
    'codeblock("json", __a)': ({__a}) => {
        const {code} = putout(toJS(extract(__a)));
        return '';
    },
});
