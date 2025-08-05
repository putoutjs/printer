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

const maybeParensCondition = ({print, condition, checkParens = true}) => ({
    ...maybeParensPrint(print),
    condition: (path, print, semantics) => {
        const is = condition?.(path, print, semantics);
        
        if (!checkParens)
            return is;
        
        return is || isParens(path);
    },
});
