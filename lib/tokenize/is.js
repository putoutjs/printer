'use strict';

const {isMarkedAfter} = require('./mark');

const {
    isStringLiteral,
    isIdentifier,
    isIfStatement,
    isStatement,
    isForOfStatement,
    isVariableDeclaration,
} = require('@babel/types');

const isParentProgram = (path) => path.parentPath?.isProgram();
const isParentBlock = (path) => path.parentPath.isBlockStatement();

const isNext = (path) => {
    const next = path.getNextSibling();
    
    if (!next.node)
        return false;
    
    if (isMarkedAfter(path.get('body')))
        return false;
    
    return !next.isEmptyStatement();
};

const isNextParent = (path) => isNext(path.parentPath);
const isLast = (path) => isParentProgram(path) && !isNext(path);

module.exports.isFirst = (path) => path.node === path.parentPath.node.body?.[0];
module.exports.isPrevBody = (path) => path.getPrevSibling().isBlockStatement();
module.exports.isNext = isNext;
module.exports.isNextParent = isNextParent;
module.exports.isParentProgram = isParentProgram;
module.exports.isParentBlock = isParentBlock;
module.exports.isLast = isLast;
module.exports.isParentLast = (path) => isLast(path.parentPath);
module.exports.isCoupleLines = isCoupleLines;

function isCoupleLines(path) {
    const start = path.node?.loc?.start?.line;
    const end = path.node?.loc?.end?.line;
    
    return end > start;
}
module.exports.exists = (a) => a.node;
module.exports.isStringAndIdentifier = ([a, b]) => isStringLiteral(a) && isIdentifier(b);

const isIfOrStatement = (a) => isIfStatement(a) || isStatement(a);
const isForOfOrStatement = (a) => isForOfStatement(a) || isStatement(a);

module.exports.isIf = (path) => isIfStatement(path.find(
    isIfOrStatement,
));

module.exports.isForOf = (path) => {
    const current = path.find(isForOfOrStatement);
    
    if (isForOfStatement(current))
        return true;
    
    if (isVariableDeclaration(current))
        return isForOfStatement(current.parentPath);
    
    return false;
};

module.exports.isNewlineBetweenStatements = (path) => {
    const endCurrent = path.node?.loc?.end?.line;
    const startNext = path.getNextSibling().node?.loc?.start?.line;
    
    if (!startNext)
        return false;
    
    return startNext - endCurrent > 1;
};

module.exports.satisfy = (conditions) => (path) => {
    for (const condition of conditions)
        return false;
};
