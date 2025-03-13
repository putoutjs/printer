'use strict';

const {types} = require('@putout/babel');
const {
    isStringLiteral,
    isIdentifier,
    isIfStatement,
    isStatement,
    isForOfStatement,
    isVariableDeclaration,
    isMemberExpression,
    isArrayExpression,
    isObjectExpression,
    isLabeledStatement,
} = types;

const isParentProgram = (path) => path.parentPath?.isProgram();
const isParentBlock = (path) => path.parentPath.isBlockStatement();

const isNext = (path) => {
    const next = path.getNextSibling();
    
    if (!next.node)
        return false;
    
    return !next.isEmptyStatement();
};

const isPrev = (path) => {
    const next = path.getPrevSibling();
    return next.node;
};

const isNextParent = (path) => isNext(path.parentPath);
const isLast = (path) => isParentProgram(path) && !isNext(path);

module.exports.isNextObject = (a) => a
    .getNextSibling()
    .isObjectExpression();

module.exports.isPrevObject = (a) => a
    .getPrevSibling()
    .isObjectExpression();

module.exports.isFirst = (path) => path.node === path.parentPath.node.body?.[0];
module.exports.isPrevBody = (path) => path
    .getPrevSibling()
    .isBlockStatement();
module.exports.isNext = isNext;
module.exports.isPrev = isPrev;
module.exports.isNextParent = isNextParent;
module.exports.isParentProgram = isParentProgram;
module.exports.isParentBlock = isParentBlock;
module.exports.isLast = isLast;
module.exports.isParentLast = (path) => isLast(path.parentPath);

module.exports.isIndented = (path = {}) => {
    const {parentPath, node} = path;
    
    if (!parentPath.node.loc)
        return true;
    
    return node.loc?.start.column !== parentPath.node.loc.start.column;
};

module.exports.isCoupleLines = isCoupleLines;

function isCoupleLines(path) {
    const start = path.node?.loc?.start?.line;
    const end = path.node?.loc?.end?.line;
    
    return end !== start;
}

module.exports.exists = (a) => a.node;
module.exports.isStringAndIdentifier = isStringAndIdentifier;
function isStringAndIdentifier([a, b]) {
    return isStringLiteral(a) && isIdentifier(b);
}

const checkObject = (elements) => {
    let a = elements.at(-1);
    
    if (!isObjectExpression(a))
        a = elements.at(-2);
    
    if (!isObjectExpression(a))
        return false;
    
    return a.node.properties.length;
};

module.exports.isSimpleAndNotEmptyObject = (elements) => {
    const [a] = elements;
    
    const simpleTypes = [
        'Identifier',
        'SpreadElement',
        'ArrayExpression',
        'CallExpression',
        'NewExpression',
    ];
    
    if (a && !simpleTypes.includes(a.type))
        return false;
    
    return checkObject(elements);
};

module.exports.isIdentifierAndIdentifier = ([a, b]) => {
    return isIdentifier(a) && isIdentifier(b);
};

module.exports.isStringAndMember = ([a, b]) => isStringLiteral(a) && isMemberExpression(b);
module.exports.isIdentifierAndString = ([a, b]) => isIdentifier(a) && isStringLiteral(b);
module.exports.isStringAndArray = ([a, b]) => {
    if (!isStringLiteral(a))
        return false;
    
    if (!isArrayExpression(b))
        return false;
    
    return !isStringAndIdentifier(b.node.elements);
};

const isIfOrStatement = (a) => isIfStatement(a) || isStatement(a);
const isForOfOrStatement = (a) => isForOfStatement(a) || isStatement(a);

module.exports.isIf = (path) => isIfStatement(path.find(isIfOrStatement));

module.exports.isForOf = (path) => {
    const current = path.find(isForOfOrStatement);
    
    if (isForOfStatement(current))
        return true;
    
    if (isVariableDeclaration(current))
        return isForOfStatement(current.parentPath);
    
    return false;
};

module.exports.isInsideIf = (path) => path.parentPath?.isIfStatement();

module.exports.isNewlineBetweenSiblings = (path) => {
    const endCurrent = path.node?.loc?.end?.line;
    const startNext = path.getNextSibling().node?.loc?.start?.line;
    
    if (!startNext)
        return false;
    
    return startNext - endCurrent > 1;
};

module.exports.isInsideLabel = ({parentPath}) => isLabeledStatement(parentPath);

module.exports.satisfy = (conditions) => (path) => {
    for (const condition of conditions)
        if (condition(path))
            return true;
    
    return false;
};

const parseNode = (path) => path.node || path;

module.exports.hasCoupleTrailingComments = (path) => {
    const node = parseNode(path);
    return node?.trailingComments?.length > 1;
};

module.exports.hasTrailingComment = (path) => {
    const node = parseNode(path);
    return node.trailingComments?.length;
};

module.exports.hasLeadingComment = (path) => path.node?.leadingComments?.length;

module.exports.noTrailingComment = (path) => !path.node.trailingComments?.length;
module.exports.noLeadingComment = (path) => !path.node.leadingComments?.length;

