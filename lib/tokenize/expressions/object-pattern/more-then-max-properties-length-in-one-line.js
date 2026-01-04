import {types} from '@putout/babel';

const {
    isAssignmentPattern,
    isIdentifier,
} = types;

function getLength(left, right) {
    if (isIdentifier(left) && isIdentifier(right))
        return left.name.length + right.name.length;
    
    if (isIdentifier(left))
        return left.name.length;
    
    return 0;
}

export const moreThenMaxPropertiesLengthInOneLine = (path, {maxPropertiesLengthInOneLine}) => {
    const {properties} = path.node;
    
    for (const {key, value} of properties) {
        if (isAssignmentPattern(value)) {
            const {left, right} = value;
            
            const length = getLength(left, right);
            
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
