import {createTypeChecker} from '#type-checker';

const isLineComment = ({type}) => type === 'CommentLine';
const isTestOrConsequent = ({key}) => key === 'test' || key === 'consequent';
const isLineOnly = ({node}) => node.trailingComments.every(isLineComment);

export const isTernaryOperand = createTypeChecker([
    ['-: parentPath -> !ConditionalExpression'],
    ['-: node.trailingComments.length -> -'],
    ['-: -> !', isLineOnly],
    ['+', isTestOrConsequent],
]);

export const hasTernaryComments = (path) => {
    if (isTernaryOperand(path.get('test')))
        return true;
    
    return isTernaryOperand(path.get('consequent'));
};

const isSameLine = ({loc}, comment) => !loc || comment.loc.start.line === loc.end.line;

export const printSameLineComment = (path, {print}) => {
    const {node} = path;
    
    if (!isTernaryOperand(path))
        return;
    
    const [comment] = node.trailingComments;
    
    if (!isSameLine(node, comment))
        return;
    
    print.space();
    print(`//${comment.value}`);
};

export const printOwnLineComments = (path, {print}) => {
    const {node} = path;
    
    if (!isTernaryOperand(path))
        return;
    
    for (const comment of node.trailingComments) {
        if (isSameLine(node, comment) && comment === node.trailingComments[0])
            continue;
        
        print(`//${comment.value}`);
        print.breakline();
    }
};
