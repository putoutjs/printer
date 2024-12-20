'use strict';

const {types} = require('@putout/babel');

const {wrongShorthand} = require('./wrong-shortand');

const {
    isForOf,
    isCoupleLines,
    exists,
} = require('../../is');

const {moreThenMaxPropertiesInOneLine} = require('./more-then-max-properties-in-one-line');

const {maybeTypeAnnotation} = require('../../maybe/maybe-type-annotation');
const {moreThenMaxPropertiesLengthInOneLine} = require('./more-then-max-properties-length-in-one-line');
const {printKey} = require('../object-expression/print-key');
const isInsideFn = (path) => path.parentPath.isFunction();

const {
    isIdentifier,
    isObjectPattern,
    isAssignmentPattern,
    isVariableDeclarator,
} = types;

function isIndent(path) {
    return !path.parentPath.isArrayPattern();
}

const isCoupleProperties = ({path, valuePath, property}) => {
    if (!isCoupleLines(valuePath))
        return false;
    
    if (exists(property.getPrevSibling()))
        return false;
    
    if (path.parentPath.isVariableDeclarator() && !hasAssign(path.get('properties')))
        return false;
    
    return !path.parentPath.isObjectProperty();
};

module.exports.ObjectPattern = {
    print: maybeTypeAnnotation((path, printer, semantics) => {
        const shouldIndent = isIndent(path);
        const {
            maxPropertiesInOneLine,
            maxPropertiesLengthInOneLine,
        } = semantics;
        
        const {
            print,
            maybe,
            indent,
        } = printer;
        
        maybe.indent.inc(shouldIndent);
        print('{');
        
        const properties = path.get('properties');
        const n = properties.length - 1;
        
        const is = shouldAddNewline(path, {
            maxPropertiesInOneLine,
            maxPropertiesLengthInOneLine,
        });
        
        const hasObject = n && hasObjectPattern(properties);
        
        const notInsideFn = !isInsideFn(path);
        maybe.print.newline(is && notInsideFn);
        
        for (const [i, property] of properties.entries()) {
            if (property.isRestElement()) {
                const couple = is || hasObject;
                
                maybe.indent(couple);
                print(property);
                maybe.print.newline(couple);
                continue;
            }
            
            const valuePath = property.get('value');
            const keyPath = property.get('key');
            const isAssign = valuePath.isAssignmentPattern();
            
            const {shorthand, computed} = property.node;
            const couple = isCoupleProperties({
                path,
                property,
                valuePath,
            });
            
            maybe.indent(is && notInsideFn);
            maybe.print.breakline(couple);
            
            printKey(property, printer);
            
            if (!shorthand || wrongShorthand({computed, isAssign, keyPath, valuePath})) {
                print(':');
                print.space();
                print(valuePath);
            } else if (isAssign) {
                print(valuePath);
                
                maybe.print(couple, ',');
                maybe.print.newline(couple);
            }
            
            if (is || hasObject) {
                print(',');
                print.newline();
                
                continue;
            }
            
            if (i < n) {
                print(',');
                print.space();
            }
        }
        
        indent.dec();
        maybe.indent(is);
        maybe.indent.inc(!shouldIndent);
        print('}');
    }),
};

function checkLength(properties) {
    for (const prop of properties) {
        const {value} = prop.node;
        
        if (!isIdentifier(value))
            continue;
        
        if (value.name.length > 4)
            return true;
    }
    
    return false;
}

function hasAssign(properties) {
    for (const prop of properties) {
        const {value} = prop.node;
        
        if (isAssignmentPattern(value))
            return true;
    }
    
    return false;
}

function hasObjectPattern(properties) {
    for (const property of properties) {
        if (isObjectPattern(property.node.value))
            return true;
    }
    
    return false;
}

const ONE_LINE = false;
const COUPLE_LINES = true;

function shouldAddNewline(path, semantics) {
    const {parentPath} = path;
    const properties = path.get('properties');
    const n = properties.length - 1;
    
    const {
        maxPropertiesInOneLine,
        maxPropertiesLengthInOneLine,
    } = semantics;
    
    const moreLength = moreThenMaxPropertiesLengthInOneLine(path, {
        maxPropertiesLengthInOneLine,
    });
    
    const moreCount = moreThenMaxPropertiesInOneLine(path, {
        maxPropertiesInOneLine,
    });
    
    const fnParam = isFunctionParam(path);
    
    if (hasObjectPattern(properties))
        return COUPLE_LINES;
    
    if (moreCount && !moreLength && isVariableDeclarator(path.parentPath))
        return ONE_LINE;
    
    if (!fnParam && n && !isForOf(path) && checkLength(properties))
        return COUPLE_LINES;
    
    if (!fnParam && hasAssign(properties))
        return COUPLE_LINES;
    
    return parentPath.isObjectProperty();
}

function isFunctionParam({parentPath}) {
    if (parentPath.isFunction())
        return true;
    
    if (!parentPath.isAssignmentPattern())
        return false;
    
    return parentPath.parentPath.isFunction();
}
