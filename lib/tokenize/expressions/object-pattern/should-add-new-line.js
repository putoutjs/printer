import {types} from '@putout/babel';
import {callWithParent, isForOf} from '#is';
import {createTypeChecker} from '#type-checker';
import {isMoreThenMaxPropertiesLengthInOneLine} from './is-more-then-max-properties-length-in-one-line.js';
import {
    hasAssign,
    hasObjectPattern,
} from './has.js';

const getMaxPropertiesInOneLine = (a, {maxPropertiesInOneLine}) => maxPropertiesInOneLine;
const getValue = (a) => a.value;

const isMoreCountLessLength = createTypeChecker([
    ['-: node.properties.length', '>', getMaxPropertiesInOneLine],
    ['-', isMoreThenMaxPropertiesLengthInOneLine],
    ['+: parentPath -> VariableDeclarator'],
]);

const {
    isIdentifier,
    isAssignmentPattern,
    isObjectProperty,
    isFunction,
} = types;

function hasPropertyLeadingComment(path) {
    for (const property of path.node.properties) {
        if (property.leadingComments)
            return true;
    }
    
    return false;
}

const cutOptions = (fn) => (a) => fn(a);
const isFunctionLike = cutOptions(isFunction);

const isFunctionParam = callWithParent(createTypeChecker([
    ['+', isFunctionLike],
    ['-: -> !AssignmentPattern'],
    ['+: parentPath', isFunctionLike],
]));

const isOneOfIdentifiersHasMoreLength = createTypeChecker([
    ['-', isFunctionParam],
    ['-', isForOf],
    ['-: node.properties.length', '=', 1],
    ['+', checkLength],
]);

const hasAssignNotFunctionParam = createTypeChecker([
    ['-', isFunctionParam],
    ['+', hasAssign],
]);

export const shouldAddNewline = createTypeChecker([
    ['+', isCoupleAssigns],
    ['+', hasPropertyLeadingComment],
    ['+', hasComputed],
    ['+', hasObjectPattern],
    ['-', isMoreCountLessLength],
    ['+', hasAssignNotFunctionParam],
    ['+', isOneOfIdentifiersHasMoreLength],
    ['+: parentPath -> ObjectProperty'],
]);

function isCoupleAssigns(path) {
    if (isFunctionParam(path))
        return false;
    
    const properties = path
        .node
        .properties
        .filter(isObjectProperty)
        .map(getValue)
        .filter(isAssignmentPattern);
    
    return properties.length > 1;
}

function checkLength(path) {
    const identifiers = path
        .node
        .properties
        .map(getValue)
        .filter(isIdentifier);
    
    for (const value of identifiers) {
        if (value.name.length > 4)
            return true;
    }
    
    return false;
}

function hasComputed(path) {
    for (const {computed} of path.node.properties) {
        if (computed)
            return true;
    }
    
    return false;
}
