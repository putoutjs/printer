'use strict';

module.exports.maybeParens = (print) => ({
    condition(path) {
        return path.node.extra?.parenthesized;
    },
    before(path, {write}) {
        write('(');
    },
    print,
    after(path, {write}) {
        write(')');
    },
});
