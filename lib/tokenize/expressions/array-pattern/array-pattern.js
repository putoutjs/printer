import {maybeTypeAnnotation} from '../../maybe/maybe-type-annotation.js';
import {
    hasCommentItem,
    isSameLineArg,
    isTrailingCommentArg,
} from '../call-expression/comments.js';

const isForOf = ({parentPath}) => parentPath.parentPath.parentPath?.isForOfStatement();

const isCommaAfter = (element) => !element.isRestElement() && !isTrailingCommentArg(element);

export const ArrayPattern = maybeTypeAnnotation((path, {indent, maybe, print}, semantics) => {
    const {maxElementsInOneLine} = semantics;
    
    print('[');
    
    const elements = path.get('elements');
    indent.inc();
    
    const isNewLine = hasCommentItem(elements) || !isForOf(path) && elements.length > maxElementsInOneLine;
    const n = elements.length - 1;
    
    maybe.print(isNewLine && elements.length, '\n');
    
    for (const [index, element] of elements.entries()) {
        maybe.indent(isNewLine);
        print(element);
        
        if (isNewLine) {
            const next = elements[index + 1];
            
            maybe.print(isCommaAfter(element), ',');
            
            if (next && isSameLineArg(next)) {
                print.space();
                print(`//${next.node.leadingComments[0].value}`);
            }
            
            print('\n');
        } else if (index < n) {
            print(',');
            print.space();
        }
    }
    
    indent.dec();
    maybe.indent(elements.length && isNewLine);
    print(']');
});
