import {isConcatenation} from '#is-concatenation';
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
