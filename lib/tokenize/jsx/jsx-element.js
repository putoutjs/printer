import {types} from '@putout/babel';
import {createTypeChecker} from '#type-checker';
import {isNeedIndent} from './indent.js';

const isDeeplyNestedJSX = ({parentPath}) => {
    return isJSXElement(parentPath.parentPath?.parentPath?.parentPath);
};

const condition = createTypeChecker([
    '+: node.extra.parenthesized -> +',
    '+: parentPath -> ReturnStatement',
    '+: parentPath -> ParenthesizedExpression',
    '+: parentPath -> ArrowFunctionExpression',
    '+: parentPath -> VariableDeclarator',
]);

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
        const isJSX = isDeeplyNestedJSX(path);
        
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
