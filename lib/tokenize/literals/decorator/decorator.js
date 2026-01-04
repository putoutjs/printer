import {types} from '@putout/babel';

const {isMemberExpression} = types;

export const Decorator = (path, {print, maybe}) => {
    const {expression} = path.node;
    const isMember = isMemberExpression(expression);
    
    print('@');
    
    maybe.print(isMember, '(');
    print('__expression');
    maybe.print(isMember, ')');
};

Decorator.printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    printComment();
    print.breakline();
};
