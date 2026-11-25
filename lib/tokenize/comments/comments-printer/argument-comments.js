import {createTypeChecker} from '#type-checker';

const KEYWORDS = new Set([
    'ReturnStatement',
    'ThrowStatement',
    'YieldExpression',
    'AwaitExpression',
]);

const isKeywordParent = ({parentPath}) => KEYWORDS.has(parentPath.node.type);
const isLine = ({type}) => type === 'CommentLine';
const hasLine = ({node}) => node.leadingComments.some(isLine);

export const isKeywordArgument = createTypeChecker([
    ['-: key', '!=', 'argument'],
    ['-: -> !', isKeywordParent],
    ['-: -> JSXElement'],
    ['-: -> AssignmentExpression'],
    ['-: node.leadingComments.length -> -'],
    ['+: node.leadingComments.length -> +'],
]);

export const isKeywordArgumentWithLine = createTypeChecker([
    ['-: -> !', isKeywordArgument],
    ['+', hasLine],
]);

export const printArgument = (path, printer) => {
    const {print, indent} = printer;
    const argument = path.get('argument');
    
    if (!isKeywordArgument(argument)) {
        print('__argument');
        return;
    }
    
    const {leadingComments} = argument.node;
    
    if (!isKeywordArgumentWithLine(argument)) {
        for (const {value} of leadingComments) {
            print(`/*${value}*/`);
            print.space();
        }
        
        print('__argument');
        
        return;
    }
    
    print('(');
    indent.inc();
    print.breakline();
    
    for (const comment of leadingComments) {
        print(isLine(comment) ? `//${comment.value}` : `/*${comment.value}*/`);
        print.breakline();
    }
    
    print('__argument');
    indent.dec();
    print.breakline();
    print(')');
};
