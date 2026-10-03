import {types} from '@putout/babel';
import {isInsideCall} from '#is';
import {maybeParens} from '#maybe-parens';
import {createTypeChecker} from '#type-checker';

const getMaxArgsInOneLine = (path, {maxArgsInOneLine}) => maxArgsInOneLine;
const firstArgIsArray = (path) => isArrayExpression(path.node?.arguments?.[0]);

const isMaxArgs = createTypeChecker([
    ['-', firstArgIsArray],
    ['+: node.arguments.length', '>=', getMaxArgsInOneLine],
]);

const {
    isIdentifier,
    isArrayExpression,
} = types;

const {isArray} = Array;

const parseArgs = (path) => {
    const argsPath = path.get('arguments');
    
    if (!isArray(argsPath))
        return [];
    
    return argsPath;
};

const isMemberCallee = createTypeChecker([
    '-: -> !CallExpression',
    '-: node.callee -> !MemberExpression',
    '+: node.callee.object -> CallExpression',
]);

const callWithArg = (fn) => (path) => fn(path.get('arguments')[0]);

const isMultiline = createTypeChecker([
    ['+', callWithArg(isMemberCallee)],
    ['-: -> !', tooLong],
    ['+', isInsideCall],
]);

export const CallExpression = maybeParens((path, printer, semantics) => {
    const {print, maybe} = printer;
    
    print('__callee');
    print('__typeArguments');
    maybe.print(path.node.optional, '?.');
    
    print('(');
    
    printArgs(path, printer, semantics);
    
    print(')');
});

export const OptionalCallExpression = CallExpression;

const isSpaceAfterArg = createTypeChecker([
    ['-: parentPath -> !', isMaxArgs],
    ['+: -> ArrayExpression'],
]);

const isBreaklineAfterArg = createTypeChecker([
    ['-: -> ArrayExpression'],
    ['+: parentPath', isMaxArgs],
    ['+', isMemberCallee],
    ['-: parentPath -> !', isMultiline],
    ['+: parentPath.node.arguments.length', '>', 1],
]);

const isCommaAfterArg = createTypeChecker([
    ['+', isMaxArgs],
    ['-: node.arguments.length', '<=', 1],
    ['+', isMultiline],
]);

function printArgs(path, printer, semantics) {
    const args = parseArgs(path);
    const maxArgs = isMaxArgs(path, semantics);
    const multiline = maxArgs || isMultiline(path, semantics);
    
    const {
        indent,
        print,
        maybe,
    } = printer;
    
    const n = args.length - 1;
    
    maybe.indent.inc(multiline);
    
    for (const [i, arg] of args.entries()) {
        if (isSpaceAfterArg(arg, semantics))
            print.space();
        
        if (isBreaklineAfterArg(arg, semantics))
            print.breakline();
        
        print(arg);
        
        if (isCommaAfterArg(path, semantics)) {
            print(',');
            continue;
        }
        
        if (isMemberCallee(arg) || i < n)
            print(',');
        
        if (i < n)
            print.space();
    }
    
    if (multiline) {
        indent.dec();
        maybe.print.breakline(n || maxArgs || isMemberCallee(args[0]));
    }
}

function tooLong(path) {
    const args = parseArgs(path);
    
    for (const arg of args) {
        if (isIdentifier(arg) && arg.node.name.length > 10)
            return true;
    }
    
    return false;
}
