'use strict';

const {isCoupleLines} = require('../is');
const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;
const isLogical = (path) => path.get('argument').isLogicalExpression();

const isForOf = (path) => {
    if (path.parentPath.isForOfStatement())
        return true;
    
    return path.parentPath?.parentPath?.isForOfStatement();
};

module.exports.ObjectExpression = (path, {print, maybe, indent}) => {
    indent.inc();
    
    const properties = path.get('properties');
    const {length} = properties;
    const parens = isBodyOfArrow(path);
    const manyLines = !isOneLine(path);
    
    maybe.print(parens, '(');
    print('{');
    maybe.print(manyLines, '\n');
    
    for (const property of properties) {
        if (property.isSpreadElement()) {
            maybe.indent(length > 1 || isLogical(property));
            print(property);
            
            if (length > 1) {
                print(',');
                print.newline();
            }
            
            continue;
        }
        
        maybe.indent(manyLines);
        
        if (property.isObjectMethod()) {
            print(property);
            continue;
        }
        
        print(property);
        maybe.print.newline(manyLines);
    }
    
    indent.dec();
    maybe.indent(manyLines);
    print('}');
    maybe.print.newline(path.parentPath.isLogicalExpression());
    maybe.print(parens, ')');
};

module.exports.ObjectProperty = (path, {print, maybe}) => {
    const {
        shorthand,
        computed,
    } = path.node;
    
    const manyLines = !isOneLine(path.parentPath);
    
    maybe.print(computed, '[');
    print('__key');
    maybe.print(computed, ']');
    
    if (!shorthand) {
        print(': ');
        print('__value');
    }
    
    maybe.print(manyLines, ',');
};

function isOneLine(path) {
    const isCall = path.parentPath.isCallExpression();
    const {length} = path.get('properties');
    
    if (!length)
        return true;
    
    if (isCoupleLines(path))
        return false;
    
    if (isCall && length < 2)
        return true;
    
    return isForOf(path);
}
