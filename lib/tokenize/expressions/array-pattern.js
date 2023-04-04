'use strict';

const isForOf = ({parentPath}) => parentPath.parentPath.parentPath.isForOfStatement();

module.exports.ArrayPattern = (path, {indent, maybe, print}) => {
    print('[');
    
    const elements = path.get('elements');
    indent.inc();
    
    const isNewLine = !isForOf(path) && elements.length > 2;
    const n = elements.length - 1;
    
    maybe.print(isNewLine && elements.length, '\n');
    
    for (const [index, element] of elements.entries()) {
        maybe.indent(isNewLine);
        print(element);
        maybe.print(isNewLine, ',\n');
        maybe.print(!isNewLine && index < n, ', ');
    }
    
    indent.dec();
    maybe.indent(elements.length && isNewLine);
    print(']');
};
