import {isCoupleLines} from '#is';
import {createTypeChecker} from '#type-checker';

const isNotJSX = (grandPath) => {
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

const isIndent = createTypeChecker([
    ['-: -> !', isCoupleLines],
    ['+: parentPath.parentPath -> JSXElement'],
    ['+: parentPath.parentPath -> CallExpression'],
]);

export const JSXOpeningElement = (path, {print, maybe}) => {
    const coupleLines = isCoupleLines(path);
    const shouldIndent = isIndent(path);
    
    maybe.indent.inc(shouldIndent);
    maybe.indent(isNotJSX(path.parentPath.parentPath));
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
