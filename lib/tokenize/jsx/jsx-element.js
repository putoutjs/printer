import {types} from '@putout/babel';
import {isNeedIndent} from './indent.js';

const {
    isJSXElement,
    isArrowFunctionExpression,
} = types;

const isInsideArrow = ({parentPath}) => isArrowFunctionExpression(parentPath);

export const JSXElement = {
    condition,
    before(path, {write, indent, maybe}) {
        const {leadingComments} = path.node;
        const leadingCommentsCount = leadingComments?.length;
        
        maybe.write.space(!leadingCommentsCount && isInsideArrow(path));
        indent.inc();
        
        if (!leadingCommentsCount) {
            write('(');
            write.newline();
        }
    },
    print(path, {print, traverse, maybe}) {
        const needIndent = isNeedIndent(path);
        maybe.indent.inc(needIndent);
        
        print('__openingElement');
        path.get('children').map(traverse);
        
        print('__closingElement');
        
        maybe.indent.dec(needIndent);
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
    
    if (path.parentPath.isParenthesizedExpression())
        return true;
    
    if (path.node.extra?.parenthesized)
        return true;
    
    if (path.parentPath.isArrowFunctionExpression())
        return true;
    
    return path.parentPath.isVariableDeclarator();
}

