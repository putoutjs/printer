'use strict';

module.exports.JSXElement = {
    condition,
    before(path, {write, indent}) {
        write('(');
        indent.inc();
        write.breakline();
    },
    print(path, {print, traverse, indent, maybe}) {
        const insideFn = path.parentPath.isArrowFunctionExpression();
        const insideCall = path.parentPath.parentPath.isCallExpression();
        
        if (insideFn && insideCall) {
            indent.inc();
            indent.inc();
            indent();
        }
        
        print('__openingElement');
        path
            .get('children')
            .map(traverse);
        
        print('__closingElement');
        
        if (insideFn && insideCall) {
            indent.dec();
            maybe.print.breakline(insideCall);
            indent.dec();
        }
    },
    after(path, {write, indent}) {
        indent.dec();
        write.breakline();
        write(')');
    },
};

function condition(path) {
    if (path.parentPath.isReturnStatement())
        return true;
    
    if (path.node.extra?.parenthesized)
        return true;
    
    return path.parentPath.isVariableDeclarator();
}
