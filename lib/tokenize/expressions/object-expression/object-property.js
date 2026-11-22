import {isConcatenation} from '#is-concatenation';
import {markBefore} from '#mark';
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

const isFirst = (path) => path === path.parentPath.get('properties')[0];

ObjectProperty.printLeadingCommentLine = (path, printer, semantics, {printComment, isLast, isPreviousLine}) => {
    const {print, maybe} = printer;
    const first = isFirst(path);
    
    maybe.indent(first);
    
    if (isPreviousLine())
        maybe.print.breakline(!first);
    else
        print.space();
    
    printComment();
    
    if (isLast) {
        print.breakline();
        return;
    }
    
    print.newline();
};

ObjectProperty.printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {maybe, indent} = printer;
    const first = isFirst(path);
    
    maybe.indent(first);
    maybe.print.breakline(!first);
    printComment();
    markBefore(path);
    indent();
};
