'use strict';

const {isCoupleLines} = require('../is');

const isNotJSX = ({parentPath}) => {
    if (parentPath.parentPath.isCallExpression())
        return false;
    
    if (parentPath.parentPath.isJSXElement())
        return false;
    
    if (parentPath.parentPath.isJSXExpressionContainer())
        return false;
    
    if (parentPath.parentPath.isJSXFragment())
        return false;
    
    return !parentPath.parentPath.isLogicalExpression();
};

module.exports.JSXOpeningElement = {
    print(path, {print, maybe}) {
        maybe.indent(isNotJSX(path));
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
    },
};
