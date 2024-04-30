'use strict';

const {isIdentifier} = require('@putout/babel').types;

module.exports.moreThenMaxPropertiesLengthInOneLine = (path, {maxPropertiesLengthInOneLine}) => {
    const {properties} = path.node;
    
    for (const {key} of properties) {
        if (!isIdentifier(key))
            continue;
        
        const {name} = key;
        
        if (name.length >= maxPropertiesLengthInOneLine)
            return true;
    }
    
    return false;
};
