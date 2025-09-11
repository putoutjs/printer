'use strict';

const {types} = require('@putout/babel');
const calculateLongAssignPattern = (path, semantics) => {
    if (!path.node)
        return false;
    
    if (!isAssignmentPattern(path.node.value))
        return false;
    
    const {maxPropertiesLengthInOneLine} = semantics;
    
    return !(path.node.key.name.length <= maxPropertiesLengthInOneLine);
};
const {isAssignmentPattern} = types;

module.exports.calculateAssigns = (property, semantics) => {
    const currentAssign = calculateLongAssignPattern(property, semantics);
    const prevAssign = calculateLongAssignPattern(property.getPrevSibling(), semantics);
    const nextAssign = calculateLongAssignPattern(property.getNextSibling(), semantics);
    const bothLongAssigns = currentAssign && (nextAssign || prevAssign);
    
    const oneLongAssign = currentAssign
        && (!property.getNextSibling().node
        || nextAssign
        || !isAssignmentPattern(property
            .getNextSibling()
            .get('value')));
    
    return {
        bothLongAssigns,
        oneLongAssign,
    };
};

module.exports.isLongAssignPattern = calculateLongAssignPattern;

