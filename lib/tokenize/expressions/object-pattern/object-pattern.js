import {wrongShorthand} from './wrong-shorthand.js';
import {maybeTypeAnnotation} from '../../maybe/maybe-type-annotation.js';
import {printKey} from '../object-expression/print-key.js';
import {isBreaklineBeforeProperty} from './calculate-long-assign-pattern.js';
import {printLeadingComments} from './comments.js';
import {shouldAddNewline} from './should-add-new-line.js';
import {
    hasAssignObject,
    hasObjectPattern,
} from './has.js';
import {
    isCommaAfterProperty,
    isNewlineAfterComma,
} from './comma.js';
import {
    isIndentBeforeProperty,
    isIndentAfterNewline,
} from './indent.js';
import {
    isCoupleProperties,
    isIndent,
    isInsideFn,
} from './is.js';

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
            if (isIndentBeforeProperty(property, {is}))
                indent();
            
            if (property.isRestElement()) {
                const couple = is || hasObject;
                
                print(property);
                maybe.print.newline(couple);
                continue;
            }
            
            const valuePath = property.get('value');
            const keyPath = property.get('key');
            const isAssign = valuePath.isAssignmentPattern();
            
            const {shorthand, computed} = property.node;
            const couple = isCoupleProperties({
                path,
                property,
                valuePath,
            });
            
            if (isBreaklineBeforeProperty(property, {couple, semantics}))
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
            }
            
            if (isCommaAfterProperty(property, {is, couple}))
                print(',');
            
            if (isNewlineAfterComma(property, {is, couple})) {
                print.newline();
                
                if (isIndentAfterNewline(property))
                    indent();
                
                continue;
            }
            
            if (i < n)
                print.space();
        }
        
        indent.dec();
        
        maybe.indent(is || hasAssignObject(path, maxPropertiesLengthInOneLine));
        maybe.indent.inc(!shouldIndent);
        print('}');
    }),
};
