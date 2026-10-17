import {isCoupleLines} from '#is';
import {isIndent, isIndentBefore} from './indent.js';

export const JSXOpeningElement = (path, {print, maybe}) => {
    const coupleLines = isCoupleLines(path);
    const shouldIndent = isIndent(path);
    
    maybe.indent.inc(shouldIndent);
    maybe.indent(isIndentBefore(path));
    print('<');
    print('__name');
    
    for (const attr of path.get('attributes')) {
        maybe.print.space(!coupleLines);
        print(attr);
    }
    
    if (isCoupleLines(path))
        print.breakline();
    
    if (path.node.selfClosing)
        print('/');
    
    print('>');
    maybe.indent.dec(shouldIndent);
};
