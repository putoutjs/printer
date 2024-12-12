'use strict';

const isParens = (path) => path.node.extra?.parenthesized;

module.exports.isParens = isParens;
module.exports.maybeParens = (print) => ({
    condition: isParens,
    before(path, {write}) {
        write('(');
    },
    print,
    after(path, {write}) {
        write(')');
    },
});
