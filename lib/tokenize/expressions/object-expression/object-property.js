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

ObjectProperty.printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {maybe, indent} = printer;
    const first = isFirstProperty(path);
    
    maybe.indent(first);
    maybe.print.breakline(!first);
    printComment();
    markBefore(path);
    indent();
};
