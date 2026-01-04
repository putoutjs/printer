const isFn = (a) => typeof a === 'function';

export const isParens = (path) => path.node.extra?.parenthesized;

export const maybeParens = (print) => {
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
