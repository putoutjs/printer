import {types} from '@putout/babel';
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
    hasAssignObject,
    hasObjectPattern,
} from './has.js';
import {
    isCoupleProperties,
    isIndent,
    isInsideFn,
    isInsideForOf,
    isNextAssignObject,
    isPrevAssign,
    isPrevAssignObject,
} from './is.js';

const {isObjectExpression} = types;

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
