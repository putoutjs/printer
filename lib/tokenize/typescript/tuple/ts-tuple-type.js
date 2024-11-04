'use strict';

module.exports.TSTupleType = (path, {write, traverse, indent, maybe}) => {
    const elementTypes = path.get('elementTypes');
    
    write('[');
    indent.inc();
    
    const isSame = isSameType(elementTypes);
    maybe.write.newline(isSame && elementTypes.length);
    const n = elementTypes.length - 1;
    
    for (const [i, elementType] of elementTypes.entries()) {
        maybe.indent(isSame);
        traverse(elementType);
        maybe.write(i < n || isSame, ',');
        maybe.write.newline(isSame);
        maybe.write.space(i < n && !isSame);
    }
    
    indent.dec();
    maybe.indent(isSame && elementTypes.length);
    write(']');
};

function isSameType(array) {
    let type;
    
    for (const current of array) {
        if (type && current.type !== type)
            return false;
        
        ({type} = current);
    }
    
    return true;
}
