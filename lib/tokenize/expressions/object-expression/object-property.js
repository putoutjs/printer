import {isConcatenation} from '../binary-expression/concatenate.js';
import {isMultiline} from './object-expression.js';
import {printKey} from './print-key.js';
import {
    isCommaAfterProperty,
    isCommaAfterSpread,
} from './comma.js';

export const ObjectProperty = (path, printer, semantics) => {
    const {trailingComma} = semantics;
    const {shorthand} = path.node;
    const {
        maybe,
        traverse,
        write,
    } = printer;
    
    const value = path.get('value');
    const properties = path.parentPath.get('properties');
    const isLast = path === properties.at(-1);
    const multiline = isMultiline(path.parentPath);
    
    printKey(path, printer);
    
    if (!shorthand) {
        write(':');
        maybe.write.space(!isConcatenation(value));
        traverse(value);
    }
    
    if (isCommaAfterProperty(path, {isLast, multiline, trailingComma}))
        write(',');
    
    if (!isLast && !multiline)
        write.space();
};
