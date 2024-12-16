'use strict';

const isFn = (a) => typeof a === 'function';
const isParens = (path) => path.node.extra?.parenthesized;

module.exports.isParens = isParens;
module.exports.maybeParens = (print) => {
    if (isFn(print))
        return maybeParensPrint(print);
    
    return maybeParensCondition(print);
};

const maybeParensPrint = (print) => ({
    condition: isParens,
    before(path, {write}) {
        write('(');
    },
    print,
    after(path, {write}) {
        write(')');
    },
});

const maybeParensCondition = ({print, condition}) => ({
    ...maybeParensPrint(print),
    condition: (path) => condition?.(path) || isParens(path),
});
