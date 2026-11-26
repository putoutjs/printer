const PREV = {
    right: 'left',
    consequent: 'test',
    alternate: 'consequent',
};

const NEXT = {
    left: 'right',
    test: 'consequent',
    consequent: 'alternate',
};

const isLineComment = ({type}) => type === 'CommentLine';
const isInOrInstanceof = ({operator}) => operator === 'in' || operator === 'instanceof';

const isBinaryLike = ({node}) => {
    if (node.type === 'LogicalExpression')
        return true;
    
    return node.type === 'BinaryExpression' && !isInOrInstanceof(node);
};

const isGapParent = ({key, parentPath}) => {
    if (key === 'right')
        return isBinaryLike(parentPath);
    
    if (key === 'consequent' || key === 'alternate')
        return parentPath.isConditionalExpression();
    
    return false;
};

const getPrev = ({key, parentPath}) => parentPath.get(PREV[key]);

const isSameLine = ({loc}, comment) => loc && comment.loc.start.line === loc.end.line;

const getGapComments = (path) => {
    if (!isGapParent(path))
        return [];
    
    const trailingComments = getPrev(path).node.trailingComments || [];
    const leadingComments = path.node.leadingComments || [];
    
    const comments = [...new Set([...trailingComments, ...leadingComments])];
    
    if (comments.every(isLineComment))
        return comments;
    
    return [];
};

export const isGapRight = (path) => getGapComments(path).length > 0;

export const isGapPrev = ({key, parentPath}) => {
    const next = NEXT[key];
    
    return next && isGapRight(parentPath.get(next));
};

export const printGapSameLine = (path, {print}) => {
    const [comment] = getGapComments(path);
    
    if (!comment || !isSameLine(getPrev(path).node, comment))
        return;
    
    print.space();
    print(`//${comment.value}`);
};

export const printGapOwnLine = (path, {print}) => {
    const prev = getPrev(path).node;
    
    for (const [index, comment] of getGapComments(path).entries()) {
        if (!index && isSameLine(prev, comment))
            continue;
        
        print(`//${comment.value}`);
        print.breakline();
    }
};
