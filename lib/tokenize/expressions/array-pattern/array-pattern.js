'use strict';

const {maybeTypeAnnotation} = require('../../maybe/maybe-type-annotation');
const isForOf = ({parentPath}) => parentPath.parentPath.parentPath?.isForOfStatement();

module.exports.ArrayPattern = maybeTypeAnnotation((path, {indent, maybe, print}, semantics) => {
    const {maxElementsInOneLine} = semantics;
    
    print('[');
    
    const elements = path.get('elements');
    indent.inc();
    
    const isNewLine = !isForOf(path) && elements.length > maxElementsInOneLine;
    const n = elements.length - 1;
    
    maybe.print(isNewLine && elements.length, '\n');
    
    for (const [index, element] of elements.entries()) {
        maybe.indent(isNewLine);
        print(element);
        
        if (isNewLine) {
            print(',\n');
        } else if (index < n) {
            print(',');
            print.space();
        }
    }
    
    indent.dec();
    maybe.indent(elements.length && isNewLine);
    print(']');
});
