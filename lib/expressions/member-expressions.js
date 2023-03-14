'use strict';

module.exports.MemberExpression = (path, {traverse, write}) => {
    const {computed} = path.node;
    const propertyPath = path.get('property');
    
    traverse(path.get('object'));
    
    if (computed) {
        write('[');
        traverse(propertyPath);
        write(']');
        
        return;
    }
    
    write('.');
    traverse(propertyPath);
};

module.exports.OptionalMemberExpression = (path, {traverse, write}) => {
    const propertyPath = path.get('property');
    
    traverse(path.get('object'));
    
    write('?.');
    traverse(propertyPath);
};
