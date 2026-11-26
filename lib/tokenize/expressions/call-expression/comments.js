import {createTypeChecker} from '#type-checker';
import {hasDecorators} from '#is';
import {printCommentBlock} from '../../comments/comments-printer/print-comment-block.js';

const isSpecialParam = (param) => hasDecorators(param) || param.isTSParameterProperty();
const hasSpecialParam = (path) => path.get('params').some(isSpecialParam);

export const isListItem = ({listKey, parentPath}) => {
    if (listKey === 'arguments')
        return true;
    
    if (listKey === 'elements')
        return parentPath.isArrayExpression() || parentPath.isArrayPattern();
    
    if (listKey !== 'params' || !parentPath.isFunction())
        return false;
    
    return !hasSpecialParam(parentPath);
};

const isNotListItem = (path) => !isListItem(path);

const getPrevSibling = ({parentPath, listKey, key}) => parentPath.node[listKey][key - 1];

const getPrevItem = (path) => getPrevSibling(path) || path.parentPath.node.callee;

const isOwnLine = (path) => {
    const [comment] = path.node.leadingComments;
    const prev = getPrevItem(path);
    
    if (!prev || !prev.loc)
        return true;
    
    return comment.loc.start.line > prev.loc.end.line;
};

export const isOwnLineArg = createTypeChecker([
    ['-', isNotListItem],
    ['-: node.leadingComments.0.type', '!=', 'CommentLine'],
    ['+', isOwnLine],
]);

const isOnEndLine = (path) => {
    const {
        loc,
        trailingComments,
    } = path.node;
    
    if (!loc)
        return true;
    
    return trailingComments[0].loc.start.line === loc.end.line;
};

const isTrailingLine = createTypeChecker([
    ['-', isNotListItem],
    ['-: node.trailingComments.0.type', '!=', 'CommentLine'],
    ['+: node.trailingComments.length -> +'],
]);

const isTrailingOwnLineBlock = createTypeChecker([
    ['-', isNotListItem],
    ['-: node.trailingComments.0.type', '!=', 'CommentBlock'],
    ['-', isOnEndLine],
    ['+: node.trailingComments.length -> +'],
]);

export const isTrailingCommentArg = createTypeChecker([isTrailingLine, isTrailingOwnLineBlock]);

const isOnPrevLine = (path) => {
    const [comment] = path.node.leadingComments;
    const prev = getPrevSibling(path);
    
    if (!prev || !prev.loc)
        return false;
    
    return comment.loc.start.line === prev.loc.end.line;
};

export const isSameLineArg = createTypeChecker([
    ['-', isNotListItem],
    ['-: node.leadingComments.0.type', '!=', 'CommentLine'],
    ['+', isOnPrevLine],
]);

export const isCommentArg = createTypeChecker([
    isOwnLineArg,
    isTrailingCommentArg,
    isSameLineArg,
]);

export const isElementOrParam = (path) => isListItem(path) && path.listKey !== 'arguments';

const hasMultilineBlock = ({node}) => node.leadingComments.some(isMultilineBlock);

function isMultilineBlock({type, value}) {
    return type === 'CommentBlock' && value.includes('\n');
}

const isMultilineBlockItem = createTypeChecker([
    ['-: -> !', isElementOrParam],
    ['-: node.leadingComments.length -> -'],
    ['+', hasMultilineBlock],
]);

export const isCommentItem = createTypeChecker([isCommentArg, isMultilineBlockItem]);

const isCommentElement = (path) => path.node && isCommentItem(path);

export const hasCommentItem = (paths) => paths.some(isCommentElement);

export const callArgTrailingComments = {
    printTrailingCommentLine(path, printer, semantics, {printComment, index}) {
        const {print, maybe} = printer;
        
        maybe.print(!index && !path.isRestElement(), ',');
        
        if (!index && isOnEndLine(path))
            print.space();
        else
            print.breakline();
        
        printComment();
    },
    printTrailingCommentBlock(path, printer, semantics, {index}) {
        const {print, maybe} = printer;
        const {value} = path.node.trailingComments[index];
        
        maybe.print(!index && !path.isRestElement(), ',');
        print.breakline();
        printCommentBlock(value, printer);
    },
};

export const callArgComments = {
    printLeadingCommentLine(path, printer, semantics, {printComment, index}) {
        if (!index && isSameLineArg(path))
            return;
        
        printComment();
        printer.print.breakline();
    },
    printLeadingCommentBlock(path, printer, semantics, {printComment}) {
        printComment();
        printer.print.indent();
    },
};

export const listItemComments = {
    printLeadingCommentLine: callArgComments.printLeadingCommentLine,
    printLeadingCommentBlock(path, printer, semantics, {printComment, index}) {
        const {print} = printer;
        const comment = path.node.leadingComments[index];
        
        if (isMultilineBlock(comment)) {
            printComment();
            print.indent();
            
            return;
        }
        
        print(`/*${comment.value}*/`);
        print.space();
    },
};

export const hasInnerLineComment = ({node}) => {
    const innerComments = node.innerComments || [];
    
    return innerComments.some(isLineComment);
};

const isLineComment = ({type}) => type === 'CommentLine';
