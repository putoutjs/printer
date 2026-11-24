import {createTypeChecker} from '#type-checker';
import {isConcatenation} from '#is-concatenation';
import {markBefore} from '#mark';
import {
    isFirstProperty,
    printPropertyLeadingCommentLine,
} from '../../comments/comments-printer/property-comments.js';
import {isMultiline} from './object-expression.js';
import {printKey} from './print-key.js';
import {isCommaAfterProperty} from './comma.js';
import {isSpaceAfterComma} from './space.js';

export const ObjectProperty = (path, printer, semantics) => {
    const {trailingComma} = semantics;
    const {shorthand} = path.node;
    
    const {
        maybe,
        traverse,
        write,
    } = printer;
    
    const value = path.get('value');
    const multiline = isMultiline(path.parentPath);
    
    printKey(path, printer);
    
    if (!shorthand) {
        write(':');
        maybe.write.space(!isConcatenation(value));
        traverse(value);
    }
    
    if (isCommaAfterProperty(path, {multiline, trailingComma}))
        write(',');
    
    if (isSpaceAfterComma(path, {multiline}))
        write.space();
};

ObjectProperty.printLeadingCommentLine = printPropertyLeadingCommentLine;

const isFirstComment = (path, {index}) => !index;

const isOneLineBlock = (path, {index}) => {
    const {loc, value} = path.node.leadingComments[index];
    
    return !value.includes('\n') && loc.start.line === loc.end.line;
};

const isOnPrevLine = (path) => {
    const [comment] = path.node.leadingComments;
    const prev = path.getPrevSibling();
    
    if (!prev.node.loc)
        return false;
    
    return comment.loc.start.line === prev.node.loc.end.line;
};

const isSameLineBlock = createTypeChecker([
    ['-: -> !', isFirstComment],
    ['-', isFirstProperty],
    ['-: -> !', isOneLineBlock],
    ['+', isOnPrevLine],
]);

ObjectProperty.printLeadingCommentBlock = (path, printer, semantics, {printComment, index}) => {
    const {
        maybe,
        indent,
        print,
    } = printer;
    
    if (isSameLineBlock(path, {index})) {
        const {value} = path.node.leadingComments[index];
        
        print.space();
        print(`/*${value}*/`);
        print.breakline();
        markBefore(path);
        
        return;
    }
    
    const first = isFirstProperty(path);
    
    maybe.indent(first);
    maybe.print.breakline(!first && !index);
    printComment();
    markBefore(path);
    indent();
};
