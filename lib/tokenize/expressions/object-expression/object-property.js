import {isConcatenation} from '../binary-expression/concatenate.js';
import {isOneLine} from './object-expression.js';
import {printKey} from './print-key.js';

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
    const manyLines = !isOneLine(path.parentPath);
    
    printKey(path, printer);
    
    if (!shorthand) {
        write(':');
        maybe.write.space(!isConcatenation(value));
        traverse(value);
    }
    
    if (manyLines)
        maybe.write(!isLast || trailingComma, ',');
    else if (!isLast && properties.length)
        write(', ');
};
