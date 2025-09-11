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
const {
    calculateAssigns,
    isLongAssignPattern,
} = require('./calculate-long-assign-pattern');

const {
    isObjectExpression,
    isIdentifier,
    isAssignmentPattern,
    isVariableDeclarator,
    isFunction,
    isObjectPattern,
    isForOfStatement,
    isVariableDeclaration,
} = types;

const isInsideFn = (path) => {
    if (isFunction(path.parentPath))
        return true;
    
    return isFunction(path.parentPath.parentPath);
};

function isIndent(path) {
    return !path.parentPath.isArrayPattern();
}

const isCoupleProperties = ({path, valuePath, property}) => {
    if (!isCoupleLines(valuePath))
        return false;
    
    if (exists(property.getPrevSibling()))
        return false;
    
    const properties = path.get('properties');
    
    if (path.parentPath.isVariableDeclarator() && !hasAssign(properties))
        return false;
    
    return !path.parentPath.isObjectProperty();
};

function isInsideForOf({parentPath}) {
    return isForOfStatement(parentPath.parentPath.parentPath);
}

function isPrevAssign(path) {
    const prev = path.getPrevSibling();
    
    return isAssignmentPattern(prev.node.value);
}

function isPrevAssignObject(path) {
    const prev = path.getPrevSibling();
    
    if (!isAssignmentPattern(prev.node.value))
        return false;
    
    const {right} = prev.node.value;
    
    return isObjectExpression(right);
}

function isNextAssignObject(path) {
    const next = path.getNextSibling();
    
    if (!next.node)
        return false;
    
    if (!isAssignmentPattern(next.node.value))
        return false;
    
    const {right} = next.node.value;
    
    return isObjectExpression(right);
}

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
            
            const prevAssignObject = i && isPrevAssignObject(property);
            const nextAssignObject = isNextAssignObject(property);
            
            const valuePath = property.get('value');
            const keyPath = property.get('key');
            const isAssign = valuePath.isAssignmentPattern();
            
            const {shorthand, computed} = property.node;
            const couple = isCoupleProperties({
                path,
                property,
                valuePath,
            });
            
            maybe.indent((prevAssignObject || is) && notInsideFn);
            maybe.print.breakline(couple && !isLongAssignPattern(property, semantics));
            
            if (!isAssign && nextAssignObject)
                print.breakline();
            
            printKey(property, printer);
            
            if (!shorthand || wrongShorthand({computed, isAssign, keyPath, valuePath})) {
                print(':');
                print.space();
                print(valuePath);
            } else if (isAssign) {
                print(valuePath);
                
                maybe.print(couple, ',');
                maybe.print.newline(couple);
                
                const {right} = valuePath.node;
                
                if (i && !isPrevAssign(property) && !isInsideForOf(path) && isObjectExpression(right)) {
                    print(',');
                    print.newline();
                    continue;
                }
            }
            
            if (!isAssign && nextAssignObject && notInsideFn) {
                print(',');
                print.breakline();
                continue;
            }
            
            const {
                oneLongAssign,
                bothLongAssigns,
            } = calculateAssigns(property, semantics);
            
            if ((!oneLongAssign || bothLongAssigns) && (is || hasObject || prevAssignObject && notInsideFn)) {
                print(',');
                print.newline();
                
                continue;
            }
            
            if (i < n && !(isAssign && couple)) {
                print(',');
                print.space();
            }
        }
        
        indent.dec();
        
        maybe.indent(is || hasAssignObject(path, maxPropertiesLengthInOneLine));
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

function hasAssignObject(path, maxPropertiesLengthInOneLine) {
    const {parentPath} = path;
    
    if (isVariableDeclaration(parentPath.parentPath)) {
        const {declarations} = parentPath.parentPath.node;
        
        if (declarations.length > 1)
            return false;
    }
    
    const properties = path.get('properties');
    const n = properties.length;
    
    for (const prop of properties) {
        const {value} = prop.node;
        
        if (isAssignmentPattern(value) && isObjectExpression(value.right))
            return n > 1 || maxPropertiesLengthInOneLine <= value.left;
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
