'use strict';

const {types} = require('@putout/babel');
const {isConcatenation} = require('../binary-expression/concatenate');
const {isOneLine} = require('./object-expression');
const {printKey} = require('./print-key');
const {isTSImportType} = types;
const isInsideTSImportType = ({parentPath}) => isTSImportType(parentPath.parentPath);

module.exports.ObjectProperty = (path, printer, semantics) => {
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
    
    if (manyLines && !isInsideTSImportType(path))
        maybe.write(!isLast || trailingComma, ',');
    else if (!isLast && properties.length)
        write(', ');
};
