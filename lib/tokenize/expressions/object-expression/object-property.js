'use strict';

const {isConcatenation} = require('../binary-expression/concatanate');
const {isOneLine} = require('./object-expression');

module.exports.ObjectProperty = (path, {maybe, traverse, write}, semantics) => {
    const {trailingComma} = semantics;
    const {shorthand, computed} = path.node;
    
    const key = path.get('key');
    const value = path.get('value');
    
    const properties = path.parentPath.get('properties');
    const isLast = path === properties.at(-1);
    const manyLines = !isOneLine(path.parentPath);
    
    maybe.write(computed, '[');
    traverse(key);
    maybe.write(computed, ']');
    
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
