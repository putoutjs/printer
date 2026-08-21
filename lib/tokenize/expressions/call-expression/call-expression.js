import {types} from '@putout/babel';
import {exists, isInsideCall} from '#is';
import {maybeParens} from '#maybe-parens';
import {createTypeChecker} from '#type-checker';

const {
    isIdentifier,
    isObjectExpression,
} = types;
const {isArray} = Array;

const parseArgs = (path) => {
    const argsPath = path.get('arguments');
    
    if (!isArray(argsPath))
        return [];
    
    return argsPath;
};

const isNeedsNewLine = createTypeChecker([
    ['-: -> !', tooLong],
    ['+', isInsideCall],
]);

export const CallExpression = maybeParens((path, printer, semantics) => {
    const {
        indent,
        print,
        maybe,
        traverse,
    } = printer;
    
    const args = parseArgs(path);
    const needsNewline = isNeedsNewLine(path, semantics);
    
    const callee = path.get('callee');
    const typeParameters = path.get('typeArguments');
    
    traverse(callee);
    
    if (exists(typeParameters))
        traverse(typeParameters);
    
    if (path.node.optional)
        print('?.');
    
    print('(');
    
    const n = args.length - 1;
    
    maybe.indent.inc(needsNewline);
    
    for (const [i, arg] of args.entries()) {
        const isObject = isObjectExpression(arg);
        
        if (needsNewline && !isObject && n)
            print.breakline();
        
        print(arg);
        
        if (needsNewline && n) {
            print(',');
            continue;
        }
        
        if (i < n) {
            print(',');
            print.space();
        }
    }
    
    if (needsNewline) {
        indent.dec();
        maybe.print.breakline(n);
    }
    
    print(')');
});

export const OptionalCallExpression = CallExpression;

function tooLong(path) {
    const args = parseArgs(path);
    
    for (const arg of args) {
        if (isIdentifier(arg) && arg.node.name.length > 10)
            return true;
    }
    
    return false;
}
