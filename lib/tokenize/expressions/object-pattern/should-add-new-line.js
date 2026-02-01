import {types} from '@putout/babel';
import {isForOf} from '#is';
import {moreThenMaxPropertiesInOneLine} from './more-then-max-properties-in-one-line.js';
import {moreThenMaxPropertiesLengthInOneLine} from './more-then-max-properties-length-in-one-line.js';
import {
    hasAssign,
    hasObjectPattern,
} from './has.js';

const {
    isIdentifier,
    isAssignmentPattern,
    isVariableDeclarator,
    isObjectProperty,
} = types;

const ONE_LINE = false;
const COUPLE_LINES = true;

function hasPropertyLeadingComment(properties) {
    for (const property of properties) {
        if (property.node.leadingComments)
            return true;
    }
    
    return false;
}

function isFunctionParam({parentPath}) {
    if (parentPath.isFunction())
        return true;
    
    if (!parentPath.isAssignmentPattern())
        return false;
    
    return parentPath.parentPath.isFunction();
}

export function shouldAddNewline(path, semantics) {
    const {parentPath} = path;
    const properties = path.get('properties');
    const n = properties.length - 1;
    
    if (isCoupleAssigns(path))
        return COUPLE_LINES;
    
    if (hasPropertyLeadingComment(properties))
        return COUPLE_LINES;
    
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
    
    if (hasComputed(properties))
        return COUPLE_LINES;
    
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

function isCoupleAssigns(path) {
    if (isFunctionParam(path))
        return false;
    
    let assignsCount = 0;
    
    for (const property of path.node.properties) {
        if (!isObjectProperty(property))
            continue;
        
        if (isAssignmentPattern(property.value))
            ++assignsCount;
    }
    
    return assignsCount > 1;
}

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

function hasComputed(properties) {
    for (const prop of properties) {
        const {computed} = prop.node;
        
        if (computed)
            return true;
    }
    
    return false;
}
