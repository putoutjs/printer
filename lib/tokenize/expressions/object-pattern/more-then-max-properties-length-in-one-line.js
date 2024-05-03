'use strict';

const {
    isAssignmentPattern,
    isIdentifier,
} = require('@putout/babel').types;

module.exports.moreThenMaxPropertiesLengthInOneLine = (path, {maxPropertiesLengthInOneLine}) => {
    const {properties} = path.node;
    
    for (const {key, value} of properties) {
        if (isAssignmentPattern(value)) {
            const {left, right} = value;
            
            if (!isIdentifier(left) || !isIdentifier(right))
                continue;
            
            const length = left.name.length + right.name.length;
            
            if (length >= maxPropertiesLengthInOneLine)
                return true;
        }
        
        if (!isIdentifier(key))
            continue;
        
        const {name} = key;
        
        if (name.length >= maxPropertiesLengthInOneLine)
            return true;
    }
    
    return false;
};

