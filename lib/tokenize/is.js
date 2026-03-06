import {types} from '@putout/babel';

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
    isTryStatement,
    isProgram,
    isBlockStatement,
    isTSModuleBlock,
    isSwitchCase,
    isExpressionStatement,
} = types;

export const isInsideProgram = (path) => isProgram(path.parentPath);
export const isInsideBlock = (path) => isBlockStatement(path.parentPath);
export const isInsideSwitchCase = (path) => isSwitchCase(path.parentPath);
export const isInsideBody = ({node, parentPath}) => node === parentPath.node.body;
export const isInsideExpression = ({parentPath}) => isExpressionStatement(parentPath);

export const isInsideTSModuleBlock = ({parentPath}) => isTSModuleBlock(parentPath);

export const isInsideCall = ({parentPath}) => parentPath.isCallExpression();
export const isInsideReturn = ({parentPath}) => parentPath.isReturnStatement();
export const getNext = (fn) => (path) => fn(path.getNextSibling());

export const isNext = (path) => {
    const next = path.getNextSibling();
    
    if (!next.node)
        return false;
    
    return !next.isEmptyStatement();
};

export const hasBody = ({node}) => node.body.body.length;

export const hasEmptyBody = (path) => !path.node.body.length;

export const isNextTry = (path) => {
    return isTryStatement(path.getNextSibling());
};

export const isPrevTry = (path) => isTryStatement(path.getPrevSibling());

export const isPrev = (path) => {
    const next = path.getPrevSibling();
    return next.node;
};

export const isNextParent = (path) => isNext(path.parentPath);
export const isLast = (path) => isInsideProgram(path) && !isNext(path);

export const isNextObject = (a) => a
    .getNextSibling()
    .isObjectExpression();

export const isPrevObject = (a) => a
    .getPrevSibling()
    .isObjectExpression();

export const isFirst = (path) => path.node === path.parentPath.node.body?.[0];
export const isPrevBody = (path) => path
    .getPrevSibling()
    .isBlockStatement();

export const isParentLast = (path) => isLast(path.parentPath);

export const isIndented = (path = {}) => {
    const {parentPath, node} = path;
    
    if (!parentPath.node.loc)
        return true;
    
    return node.loc?.start.column !== parentPath.node.loc.start.column;
};

export function isCoupleLines(path) {
    const start = path.node?.loc?.start?.line;
    const end = path.node?.loc?.end?.line;
    
    return end !== start;
}

export const exists = (a) => a.node;

export function isStringAndIdentifier([a, b]) {
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

export const isSimpleAndNotEmptyObject = (path) => {
    const elements = path.get('elements');
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

export const isIdentifierAndIdentifier = (path) => {
    const {elements} = path.node;
    
    if (elements.length !== 2)
        return;
    
    const [a, b] = elements;
    return isIdentifier(a) && isIdentifier(b);
};

export const isStringAndMember = ([a, b]) => isStringLiteral(a) && isMemberExpression(b);
export const isIdentifierAndString = ([a, b]) => isIdentifier(a) && isStringLiteral(b);
export const isStringAndArray = (path) => {
    const {elements} = path.node;
    
    if (elements.length !== 2)
        return false;
    
    const [a, b] = elements;
    
    if (!isStringLiteral(a))
        return false;
    
    if (!isArrayExpression(b))
        return false;
    
    return !isStringAndIdentifier(b.elements);
};

const isIfOrStatement = (a) => isIfStatement(a) || isStatement(a);
const isForOfOrStatement = (a) => isForOfStatement(a) || isStatement(a);

export const isIf = (path) => isIfStatement(path.find(isIfOrStatement));

export const isForOf = (path) => {
    const current = path.find(isForOfOrStatement);
    
    if (isForOfStatement(current))
        return true;
    
    if (isVariableDeclaration(current))
        return isForOfStatement(current.parentPath);
    
    return false;
};

export const isInsideIf = (path) => path.parentPath?.isIfStatement();
export const isInsideExport = ({parentPath}) => parentPath.isExportDeclaration();

export const isNewlineBetweenSiblings = (path) => {
    const endCurrent = path.node?.loc?.end?.line;
    const startNext = path.getNextSibling().node?.loc?.start?.line;
    
    if (!startNext)
        return false;
    
    return startNext - endCurrent > 1;
};

export const isInsideLabel = ({parentPath}) => isLabeledStatement(parentPath);

export const satisfy = (conditions) => (path) => {
    for (const condition of conditions)
        if (condition(path))
            return true;
    
    return false;
};

const parseNode = (path) => path.node || path;

export const hasCoupleTrailingComments = (path) => {
    const node = parseNode(path);
    return node?.trailingComments?.length > 1;
};

export const hasTrailingComment = (path) => {
    const node = parseNode(path);
    return node.trailingComments?.length;
};

export const hasLeadingComment = (path) => path.node?.leadingComments?.length;

export const noTrailingComment = (path) => !path.node.trailingComments?.length;
export const noLeadingComment = (path) => !path.node.leadingComments?.length;

