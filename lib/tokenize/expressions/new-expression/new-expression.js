import {types} from '@putout/babel';
import {maybeParens} from '#maybe-parens';
import {isConcatenation} from '#is-concatenation';

const {
    isMemberExpression,
    isClassDeclaration,
} = types;

const isInsideMember = ({parentPath}) => isMemberExpression(parentPath);
const isMultiline = (path) => path.get('arguments').some(isConcatenation);

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
        const multiline = isMultiline(path);
        
        if (multiline)
            printer.indent.inc();
        
        for (const [i, arg] of args.entries()) {
            maybe.print.breakline(multiline);
            print(arg);
            
            if (multiline) {
                print(',');
                continue;
            }
            
            if (i === n)
                continue;
            
            print(',');
            print.space();
        }
        
        if (multiline) {
            printer.indent.dec();
            print.breakline();
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
