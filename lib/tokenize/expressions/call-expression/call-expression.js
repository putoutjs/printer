import {types} from '@putout/babel';
import {isInsideCall} from '#is';
import {maybeParens} from '#maybe-parens';
import {createTypeChecker} from '#type-checker';

const {
    isIdentifier,
    isObjectExpression,
    isArrayExpression,
} = types;

const {isArray} = Array;

const parseArgs = (path) => {
    const argsPath = path.get('arguments');
    
    if (!isArray(argsPath))
        return [];
    
    return argsPath;
};

const getMaxArgsInOneLine = (path, {maxArgsInOneLine}) => maxArgsInOneLine;
const firstArgIsArray = (path) => isArrayExpression(path.node?.arguments?.[0]);

const isMaxArgs = createTypeChecker([
    ['-', firstArgIsArray],
    ['+: node.arguments.length', '>=', getMaxArgsInOneLine],
]);

const isMultiline = createTypeChecker([
    ['-: -> !', tooLong],
    ['+', isInsideCall],
]);

export const CallExpression = maybeParens((path, printer, semantics) => {
    const {print, maybe} = printer;
    
    const args = parseArgs(path);
    
    print('__callee');
    print('__typeArguments');
    maybe.print(path.node.optional, '?.');
    
    print('(');
    
    const maxArgs = isMaxArgs(path, semantics);
    const multiline = maxArgs || isMultiline(path, semantics);
    
    printArgs(args, printer, {
        maxArgs,
        multiline,
    });
    
    print(')');
});

export const OptionalCallExpression = CallExpression;

function printArgs(args, printer, {maxArgs, multiline}) {
    const {
        indent,
        print,
        maybe,
    } = printer;
    
    const n = args.length - 1;
    
    maybe.indent.inc(multiline);
    
    for (const [i, arg] of args.entries()) {
        if (multiline)
            if (maxArgs && isArrayExpression(arg))
                print.space();
            else if (n || maxArgs && !isObjectExpression(arg))
                print.breakline();
        
        print(arg);
        
        if (multiline && (n || maxArgs)) {
            print(',');
            continue;
        }
        
        if (i < n) {
            print(',');
            print.space();
        }
    }
    
    if (multiline) {
        indent.dec();
        maybe.print.breakline(n || maxArgs);
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
