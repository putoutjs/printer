'use strict';

const {
    isNext,
    isLast,
    isParentBlock,
    isParentLast,
    isNewlineBetweenSiblings,
    satisfy,
    noTrailingComment,
    hasTrailingComment,
    isCoupleLines,
} = require('../is');

const isBeforeElse = (path) => {
    if (!path.parentPath.isIfStatement())
        return false;
    
    if (path !== path.parentPath.get('consequent'))
        return false;
    
    return Boolean(path.parentPath.node.alternate);
};

const satisfyAfter = satisfy([
    isNotLastOrParentLast,
    isParentBlock,
    isNext,
    isNextUp,
]);

const shouldBreakline = satisfy([
    isNewlineBetweenSiblings,
    isNotLastBody,
    isStrictMode,
]);

module.exports.ExpressionStatement = {
    print(path, {indent, print, maybe, store}) {
        indent();
        print('__expression');
        print(';');
        
        if (!isNext(path))
            return;
        
        if (shouldBreakline(path)) {
            print.newline();
            maybe.indent(isNext(path) && noTrailingComment(path));
            store(true);
        }
    },
    afterIf: (path) => {
        if (satisfyAfter(path))
            return true;
        
        if (hasTrailingComment(path) && isLast(path))
            return true;
        
        return isBeforeElse(path);
    },
    after(path, {print, maybe, store}) {
        if (hasTrailingComment(path) && isLast(path) && isCoupleLines(path)) {
            print.breakline();
        }
        
        if (hasTrailingComment(path) && !isCoupleLines(path)) {
            return;
        }
        
        print.newline();
        maybe.markAfter(store(), path);
    },
};

function isNotLastBody(path) {
    return path.parentPath.get('body') === path;
}

function isNotLastOrParentLast(path) {
    return !(isLast(path) || isParentLast(path));
}

function isNextUp(path) {
    return path.findParent(isNext);
}

function isStrictMode(path) {
    const expressionPath = path.get('expression');
    
    if (!expressionPath.isStringLiteral())
        return false;
    
    const {value} = path.node.expression;
    
    return value === 'use strict';
}
