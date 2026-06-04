import {types} from '@putout/babel';
import {maybeParens} from '#maybe-parens';

const {
    isMemberExpression,
    isClassDeclaration,
} = types;

const isInsideMember = ({parentPath}) => isMemberExpression(parentPath);

export const NewExpression = maybeParens({
    print(path, printer, semantics) {
        const {print, maybe} = printer;
        const prev = path.parentPath.getPrevSibling();
        
        maybe.print.breakline(isClassDeclaration(prev));
        
        print('new ');
        print('__callee');
        print('__typeArguments');
        
        const args = path.get('arguments');
        maybePrintOpenBrace(path, printer, semantics);
        
        const n = args.length - 1;
        
        for (const [i, arg] of args.entries()) {
            print(arg);
            maybe.print(i < n, ', ');
        }
        
        maybePrintCloseBrace(path, printer, semantics);
    },
});

function maybePrintOpenBrace(path, printer, semantics) {
    maybePrintBrace('(', path, printer, semantics);
}

function maybePrintCloseBrace(path, printer, semantics) {
    maybePrintBrace(')', path, printer, semantics);
}

function maybePrintBrace(brace, path, printer, semantics) {
    const {maybe, print} = printer;
    const {roundBraces} = semantics;
    const {length} = path.node.arguments;
    
    if (length || isInsideMember(path))
        return print(brace);
    
    maybe.print(roundBraces.new, brace);
}
