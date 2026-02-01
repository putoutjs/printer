import {types} from '@putout/babel';
import {
    isForOf,
    isCoupleLines,
    exists,
} from '#is';
import {wrongShorthand} from './wrong-shorthand.js';
import {maybeTypeAnnotation} from '../../maybe/maybe-type-annotation.js';
import {printKey} from '../object-expression/print-key.js';
import {
    calculateAssigns,
    isLongAssignPattern,
} from './calculate-long-assign-pattern.js';
import {printLeadingComments} from './comments.js';
import {shouldAddNewline} from './should-add-new-line.js';
import {
    hasAssign,
    hasObjectPattern,
} from './has.js';

const {
    isObjectExpression,
    isIdentifier,
    isAssignmentPattern,
    isVariableDeclarator,
    isFunction,
    isObjectPattern,
    isForOfStatement,
    isVariableDeclaration,
    isObjectProperty,
} = types;

const isInsideFn = (path) => {
    if (isFunction(path.parentPath))
        return true;
    
    return isFunction(path.parentPath.parentPath);
};

function isIndent(path) {
    return !path.parentPath.isArrayPattern();
}

const isCoupleProperties = ({path, valuePath, property}) => {
    if (!isCoupleLines(valuePath))
        return false;
    
    if (exists(property.getPrevSibling()))
        return false;
    
    const properties = path.get('properties');
    
    if (path.parentPath.isVariableDeclarator() && !hasAssign(properties))
        return false;
    
    return !path.parentPath.isObjectProperty();
};

function isInsideForOf({parentPath}) {
    return isForOfStatement(parentPath.parentPath.parentPath);
}

function isPrevAssign(path) {
    const prev = path.getPrevSibling();
    
    return isAssignmentPattern(prev.node.value);
}

function isPrevAssignObject(path) {
    const prev = path.getPrevSibling();
    
    if (!isAssignmentPattern(prev.node.value))
        return false;
    
    const {right} = prev.node.value;
    
    return isObjectExpression(right);
}

function isNextAssignObject(path) {
    const next = path.getNextSibling();
    
    if (!next.node)
        return false;
    
    if (!isAssignmentPattern(next.node.value))
        return false;
    
    const {right} = next.node.value;
    
    return isObjectExpression(right);
}

export const ObjectPattern = {
    print: maybeTypeAnnotation((path, printer, semantics) => {
        const shouldIndent = isIndent(path);
        const {
            maxPropertiesInOneLine,
            maxPropertiesLengthInOneLine,
        } = semantics;
        
        const {
            print,
            maybe,
            indent,
        } = printer;
        
        maybe.indent.inc(shouldIndent);
        print('{');
        
        const properties = path.get('properties');
        const n = properties.length - 1;
        
        const is = shouldAddNewline(path, {
            maxPropertiesInOneLine,
            maxPropertiesLengthInOneLine,
        });
        
        const hasObject = n && hasObjectPattern(properties);
        const notInsideFn = !isInsideFn(path);
        
        maybe.print.newline(is && notInsideFn);
        
        for (const [i, property] of properties.entries()) {
            if (property.isRestElement()) {
                const couple = is || hasObject;
                
                maybe.indent(couple);
                print(property);
                maybe.print.newline(couple);
                continue;
            }
            
            const prevAssignObject = i && isPrevAssignObject(property);
            const nextAssignObject = isNextAssignObject(property);
            
            const valuePath = property.get('value');
            const keyPath = property.get('key');
            const isAssign = valuePath.isAssignmentPattern();
            
            const {shorthand, computed} = property.node;
            const couple = isCoupleProperties({
                path,
                property,
                valuePath,
            });
            
            maybe.indent((prevAssignObject || is) && notInsideFn);
            
            maybe.print.breakline(couple && !isLongAssignPattern(property, semantics));
            
            if (!isAssign && nextAssignObject)
                print.breakline();
            
            printLeadingComments(property, {
                print,
            });
            printKey(property, printer);
            
            if (!shorthand || wrongShorthand({computed, isAssign, keyPath, valuePath})) {
                print(':');
                print.space();
                print(valuePath);
            } else if (isAssign) {
                print(valuePath);
                
                maybe.print(couple, ',');
                maybe.print.newline(couple);
                
                const {right} = valuePath.node;
                
                if (i && !isPrevAssign(property) && !isInsideForOf(path) && isObjectExpression(right)) {
                    print(',');
                    print.newline();
                    continue;
                }
            }
            
            if (!isAssign && nextAssignObject && notInsideFn) {
                print(',');
                print.breakline();
                continue;
            }
            
            const {complexAssign} = calculateAssigns(property, semantics);
            
            if (!complexAssign && (is || hasObject || prevAssignObject && notInsideFn)) {
                print(',');
                print.newline();
                
                continue;
            }
            
            if (i < n && !(isAssign && couple)) {
                print(',');
                print.space();
            }
        }
        
        indent.dec();
        
        maybe.indent(is || hasAssignObject(path, maxPropertiesLengthInOneLine));
        maybe.indent.inc(!shouldIndent);
        print('}');
    }),
};

function hasAssignObject(path, maxPropertiesLengthInOneLine) {
    const {parentPath} = path;
    
    if (isVariableDeclaration(parentPath.parentPath)) {
        const {declarations} = parentPath.parentPath.node;
        
        if (declarations.length > 1)
            return false;
    }
    
    const properties = path.get('properties');
    const n = properties.length;
    
    for (const prop of properties) {
        const {value} = prop.node;
        
        if (isAssignmentPattern(value) && isObjectExpression(value.right))
            return n > 1 || maxPropertiesLengthInOneLine <= value.left;
    }
    
    return false;
}

