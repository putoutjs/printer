'use strict';

const {isCoupleLines} = require('../is');

module.exports.JSXOpeningElement = (path, {print, maybe}) => {
    print('<');
    print('__name');
    
    const coupleLines = isCoupleLines(path);
    const noCoupleLines = !coupleLines;
    const shouldIndent = coupleLines && path.parentPath.parentPath.isJSXElement();
    
    maybe.indent.inc(shouldIndent);
    
    for (const attr of path.get('attributes')) {
        maybe.print.space(noCoupleLines);
        print(attr);
    }
    
    if (isCoupleLines(path))
        print.breakline();
    
    if (path.node.selfClosing)
        print('/');
    
    print('>');
    maybe.indent.dec(shouldIndent);
};
