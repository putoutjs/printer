'use strict';

const {
    isIdentifier,
    isRestElement,
    isObjectPattern,

} = require('@babel/types');

const {
    isForOf,
    isCoupleLines,
    exists,
} = require('../is');

const wrongShorthand = ({computed, isAssign, keyPath, valuePath}) => {
    return !computed && !isAssign && keyPath.node.name !== valuePath.node.name;
};

const isOneParentProperty = ({parentPath}) => parentPath.parentPath.node.properties.length === 1;

module.exports.ObjectPattern = {
    print(path, {indent, print, maybe}) {
        indent.inc();
        print('{');
        
        const properties = path.get('properties');
        const n = properties.length - 1;
        const is = shouldAddNewline(path);
        const hasObject = n && hasObjectPattern(properties);
        
        maybe.print(is, '\n');
        
        for (const [i, property] of properties.entries()) {
            if (property.isRestElement()) {
                debugger;
                
                maybe.indent(hasObject);
                print(property);
                maybe.print.newline(hasObject);
                continue;
            }
            
            const valuePath = property.get('value');
            const keyPath = property.get('key');
            const isAssign = valuePath.isAssignmentPattern();
            
            const {
                shorthand,
                computed,
            } = property.node;
            
            const couple = isCoupleLines(valuePath) && !exists(property.getPrevSibling());
            
            maybe.indent(is);
            maybe.print.breakline(couple);
            
            maybe.print(computed, '[');
            print(keyPath);
            maybe.print(computed, ']');
            
            if (!shorthand || wrongShorthand({computed, isAssign, keyPath, valuePath})) {
                print(':');
                print.space();
                print(valuePath);
            } else if (isAssign) {
                print(valuePath);
                
                maybe.print(couple, ',');
                maybe.print.newline(couple);
            }
            
            if (is || hasObject) {
                print(',');
                print.newline();
                
                continue;
            }
            
            if (i < n) {
                print(',');
                print.space();
            }
        }
        
        indent.dec();
        maybe.indent(is);
        print('}');
    },
    afterIf(path) {
        if (!path.parentPath.isObjectProperty())
            return false;
        
        if (isOneParentProperty(path))
            return true;
        
        return false;
    },
    after(path, {print}) {
        print.newline();
    },
};

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

function hasObjectPattern(properties) {
    for (const property of properties) {
        if (isObjectPattern(property.node.value))
            return true;
    }
    
    return false;
}

function shouldAddNewline(path) {
    const properties = path.get('properties');
    const n = properties.length - 1;
    
    if (!isForOf(path) && !path.parentPath.isFunction() && n && checkLength(properties))
        return true;
    
    if (path.parentPath.isObjectProperty())
        return true;
    
    return false;
}

