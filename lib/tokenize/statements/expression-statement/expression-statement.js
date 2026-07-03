import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {
    isNext,
    isNewlineBetweenSiblings,
    noTrailingComment,
    isInsideReturn,
    callWithNext,
    hasLeadingComment,
    hasTrailingComment,
} from '#is';
import {afterIf} from './after-if.js';
import {beforeIf} from './before-if.js';
import {
    printLeadingCommentLine,
    printLeadingCommentBlock,
    printTrailingCommentLine,
    printTrailingCommentBlock,
} from './comments.js';

const {isIfStatement} = types;

const isCallInsideExpression = createTypeChecker([
    '+: node.expression -> CallExpression',
]);

const isNextToAssignmentCall = createTypeChecker([
    ['-: node.expression -> AssignmentExpression'],
    ['+', callWithNext(isCallInsideExpression)],
]);

const isBreakline = createTypeChecker([
    ['+', isNewlineBetweenSiblings],
    ['+', callWithNext(isIfStatement)],
]);

const isIndent = createTypeChecker([
    noTrailingComment,
    callWithNext(isIfStatement),
    isNextToAssignmentCall,
]);

function isSameLine(path) {
    const {node} = path;
    const [first] = path.node.trailingComments;
    
    if (!node.loc)
        return false;
    
    return node.loc.start.line === first.loc.start.line;
}

const isCommentOnTheSameLine = createTypeChecker([
    ['-: -> !', hasTrailingComment],
    ['+', isSameLine],
]);

export const isIndentAfter = createTypeChecker([
    ['-', isCommentOnTheSameLine],
    ['-: node.expression -> !AssignmentExpression'],
    ['+', callWithNext(hasLeadingComment)],
]);

export const ExpressionStatement = {
    printLeadingCommentLine,
    printLeadingCommentBlock,
    printTrailingCommentLine,
    printTrailingCommentBlock,
    beforeIf,
    before(path, {indent}) {
        indent();
    },
    print(path, {print, maybe, store}) {
        print('__expression');
        maybe.print(!isInsideReturn(path), ';');
        
        if (!isNext(path))
            return;
        
        if (isBreakline(path)) {
            print.newline();
            maybe.indent(isIndent(path));
            store(true);
        }
    },
    afterIf,
    after(path, {print, maybe, store}) {
        maybe.indent(isIndentAfter(path));
        
        if (isNewlineAfter(path))
            print.newline();
        
        maybe.markAfter(store(), path);
    },
};

export const isNewlineAfter = createTypeChecker([
    ['+: -> !', hasTrailingComment],
]);
