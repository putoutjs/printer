'use strict';

const {types} = require('@putout/babel');
const {isAssignmentPattern} = types;

module.exports.calculateAssigns = (property, semantics) => {
    const prev = property.getPrevSibling();
    const next = property.getNextSibling();
    
    const currentAssign = isLongAssignPattern(property, semantics);
    const prevAssign = isLongAssignPattern(prev, semantics);
    const nextAssign = isLongAssignPattern(next, semantics);
    const bothLongAssigns = currentAssign && (nextAssign || prevAssign);
    
    const oneLongAssign = currentAssign
        && (!next.node
        || nextAssign
        || !isAssignmentPattern(next.node?.value));
    
    return {
        bothLongAssigns,
        oneLongAssign,
    };
};

module.exports.isLongAssignPattern = isLongAssignPattern;

function isLongAssignPattern(path, semantics) {
    if (!path.node)
        return false;
    
    if (!isAssignmentPattern(path.node.value))
        return false;
    
    const {maxPropertiesLengthInOneLine} = semantics;
    
    return !(path.node.key.name.length <= maxPropertiesLengthInOneLine);
}
