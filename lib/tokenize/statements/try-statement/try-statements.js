import {types} from '@putout/babel';
import {isNext, isNextTry} from '#is';

const {isExpressionStatement} = types;

export const TryStatement = {
    print(path, {print, maybe}) {
        const finalizer = path.get('finalizer');
        print.indent();
        print('try');
        print.space();
        print('__block');
        print('__handler');
        
        if (finalizer.node) {
            print.space();
            print('finally');
            print.space();
            print(finalizer);
            maybe.print.newline(!isNext(path));
        }
    },
    afterSatisfy: () => [isNext],
    after(path, {print}) {
        print.newline();
        
        if (isNextExpression(path) || isNextTry(path))
            print.breakline();
    },
};

const isNextExpression = (path) => {
    return isExpressionStatement(path.getNextSibling());
};

export const CatchClause = (path, {print, maybe}) => {
    const param = path.get('param');
    const body = path.get('body');
    
    print.space();
    print('catch');
    
    if (!param.node) {
        print.space();
    } else {
        print('(');
        print(param);
        print(')');
        print.space();
    }
    
    print(body);
    maybe.print.newline(isInsideBlock(path));
};

function isInsideBlock(path) {
    return path.parentPath.parentPath.isBlockStatement();
}
