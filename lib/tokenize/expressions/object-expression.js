'use strict';

const {
    isCoupleLines,
    isForOf,
    isIf,
} = require('../is');

const {isFunction} = require('@babel/types');

const isBodyOfArrow = (path) => path.parentPath.node.body === path.node;
const isLogical = (path) => path.get('argument').isLogicalExpression();
const isValue = (path) => path.get('properties.0.value').node;
const isParentExpression = (path) => path.parentPath.isExpressionStatement();

module.exports.ObjectExpression = (path, {print, maybe, indent}) => {
    indent.inc();
    
    const properties = path.get('properties');
    const {length} = properties;
    const parens = isParens(path);
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
    maybe.print.newline(shouldAddNewline(path));
    maybe.print(parens, ')');
};

function shouldAddNewline(path) {
    if (!path.parentPath.isLogicalExpression())
        return false;
    
    return path.parentPath.parentPath.isSpreadElement();
}
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

const ONE_LINE = true;
const MANY_LINES = false;

function isOneLine(path) {
    const {length} = path.get('properties');
    
    if (!length)
        return true;
    
    if (isForOf(path))
        return ONE_LINE;
    
    if (isIf(path))
        return ONE_LINE;
    
    if (path.parentPath.isCallExpression() && isFunction(path.parentPath.node.arguments[1]))
        return ONE_LINE;
    
    if (isCoupleLines(path))
        return MANY_LINES;
    
    return !isValue(path);
}

function isParens(path) {
    if (isBodyOfArrow(path))
        return true;
    
    if (isParentExpression(path))
        return true;
    
    return false;
}
