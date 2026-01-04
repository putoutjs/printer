import {types} from '@putout/babel';
import {exists} from '../../is.js';
import {isMarkedAfter} from '../../mark.js';

const {
    isExpressionStatement,
    isMemberExpression,
} = types;

const isInsideExpressionStatement = ({parentPath}) => isExpressionStatement(parentPath);
const notFirst = ({parentPath}) => exists(parentPath.getPrevSibling());
const isInsideMember = ({parentPath}) => isMemberExpression(parentPath);

const getPrev = ({parentPath}) => {
    const prev = parentPath.getPrevSibling();
    
    return [
        prev.node,
        prev,
    ];
};

export const NewExpression = {
    beforeIf(path) {
        if (!isInsideExpressionStatement(path))
            return false;
        
        const [exists, prev] = getPrev(path);
        
        if (!exists)
            return false;
        
        if (isMarkedAfter(prev))
            return false;
        
        if (prev.isExpressionStatement())
            return false;
        
        return notFirst(path);
    },
    before(path, {print}) {
        print.breakline();
    },
    print(path, printer, semantics) {
        const {print, maybe} = printer;
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
};

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
