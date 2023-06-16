'use strict';

module.exports.checkMaxPropertiesInOneLine = (path, {maxPropertiesInOneLine}) => {
    const {parentPath} = path;
    
    if (parentPath.isObjectProperty())
        return false;
    
    const n = path.node.properties.length;
    
    return maxPropertiesInOneLine >= n;
};
