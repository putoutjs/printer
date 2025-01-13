'use strict';

const {isCoupleLines} = require('../is');

const isNotJSX = ({parentPath}) => {
    const grandPath = parentPath.parentPath;
    
    if (grandPath.isObjectProperty())
        return false;
    
    if (grandPath.isCallExpression())
        return false;
    
    if (grandPath.isJSXElement())
        return false;
    
    if (grandPath.isJSXExpressionContainer())
        return false;
    
    if (grandPath.isJSXFragment())
        return false;
    
    return !grandPath.isLogicalExpression();
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
