'use strict';

const {
    isNext,
    isLast,
    isParentBlock,
    isParentLast,
    isNewlineBetweenStatements,
    satisfy,

} = require('../is');

const shouldBreakline = satisfy([
    isNewlineBetweenStatements,
    isNotLastBody,
    isStrictMode,
]);

module.exports.ExpressionStatement = {
    print(path, {indent, print, maybe, store}) {
        indent();
        print('__expression');
        print(';');
        
        if (shouldBreakline(path)) {
            print.newline();
            maybe.indent(isNext(path));
            store(true);
        }
    },
    afterSatisfy: () => [
        isParentOrNotLastORParentLast,
        isParentBlock,
        isNext,
        isNextUp,
    ],
    after(path, {print, maybe, store}) {
        print.newline();
        maybe.markAfter(store(), path);
    },
};

function isNotLastBody(path) {
    if (!isNext(path) && isParentBlock(path))
        return false;
    
    if (isLast(path) || isParentLast(path))
        return false;
    
    return path.parentPath.get('body') === path;
}

function isParentOrNotLastORParentLast(path) {
    return isParentBlock(path) || !(isLast(path) || isParentLast(path));
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
