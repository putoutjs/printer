'use strict';

const {isJSXElement} = require('@putout/babel').types;

const isInsideArrow = ({parentPath}) => parentPath.isArrowFunctionExpression();

module.exports.JSXElement = {
    condition,
    before(path, {write, indent, maybe}) {
        const {leadingComments} = path.node;
        
        maybe.write.space(!leadingComments && isInsideArrow(path));
        indent.inc();
        
        if (!leadingComments?.length) {
            write('(');
            write.newline();
        }
    },
    print(path, {print, traverse, indent}) {
        const insideFn = path.parentPath.isArrowFunctionExpression();
        const insideCall = path.parentPath.parentPath.isCallExpression();
        
        if (insideFn && insideCall)
            indent.inc();
        
        print('__openingElement');
        path
            .get('children')
            .map(traverse);
        
        print('__closingElement');
        
        if (insideFn && insideCall)
            indent.dec();
    },
    after(path, {write, indent, maybe}) {
        const {leadingComments} = path.node;
        const isJSX = isJSXElement(path.parentPath.parentPath?.parentPath?.parentPath);
        
        if (isJSX) {
            write.breakline();
            indent.dec();
        } else {
            indent.dec();
            write.breakline();
        }
        
        maybe.write(!leadingComments?.length, ')');
    },
};

function condition(path) {
    if (path.parentPath.isReturnStatement())
        return true;
    
    if (path.node.extra?.parenthesized)
        return true;
    
    if (path.parentPath.isArrowFunctionExpression())
        return true;
    
    return path.parentPath.isVariableDeclarator();
}
