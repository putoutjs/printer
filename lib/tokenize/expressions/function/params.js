import {parseComments} from '#comments';
import {
    isCommentItem,
    isSameLineArg,
    isTrailingCommentArg,
    hasInnerLineComment,
} from '../call-expression/comments.js';

const noop = () => {};
const parseParams = (path) => path.get('params');

export const printParams = (path, printer, semantics, customization = {}) => {
    const {typeParameters} = path.node;
    const extra = path.node.extra || {};
    
    const {
        print,
        maybe,
        traverse,
    } = printer;
    
    const {
        params = parseParams(path),
        braceOpen = '(',
        braceClose = ')',
        printSpace = print.space,
        printAfterOpen = noop,
        printBeforeClose = noop,
        printAfterClose = noop,
    } = customization;
    
    if (typeParameters)
        traverse(path.get('typeParameters'));
    
    const multiline = params.some(isCommentItem);
    
    printBraceOpen(path, {
        print,
        braceOpen,
        multiline,
    }, semantics);
    
    const hasInner = semantics.comments && !params.length && hasInnerLineComment(path);
    
    maybe.indent.inc(hasInner);
    parseComments(path, printer, semantics);
    maybe.indent.dec(hasInner);
    maybe.indent(hasInner);
    printAfterOpen();
    
    const n = params.length - 1;
    
    maybe.indent.inc(multiline);
    
    for (let i = 0; i <= n; i++) {
        const isLast = i === n;
        const current = params[i];
        
        maybe.print.breakline(multiline);
        traverse(current);
        
        if (!isLast) {
            print(',');
            printSeparator(params[i + 1], printer, {
                multiline,
                printSpace,
            });
        }
    }
    
    maybe.indent.dec(multiline);
    maybe.print(isTrailingComma(params, {
        multiline,
        extra,
    }), ',');
    
    printBeforeClose();
    maybe.print.breakline(multiline);
    printBraceClose(path, {
        print,
        braceClose,
        multiline,
    }, semantics);
    printAfterClose();
};

function printSeparator(next, {print}, {multiline, printSpace}) {
    if (!multiline)
        return printSpace();
    
    if (!isSameLineArg(next))
        return;
    
    print.space();
    print(`//${next.node.leadingComments[0].value}`);
}

const isLastRest = (params) => params
    .at(-1)
    .isRestElement();

function isTrailingComma(params, {multiline, extra}) {
    if (!multiline)
        return extra.trailingComma;
    
    return !isLastRest(params) && !isTrailingCommentArg(params.at(-1));
}

function printBraceOpen(path, {print, braceOpen, multiline}, semantics) {
    if (!multiline && isOneArgArrow(path) && !semantics.roundBraces.arrow)
        return;
    
    return print(braceOpen);
}

function printBraceClose(path, {print, braceClose, multiline}, semantics) {
    if (!multiline && isOneArgArrow(path) && !semantics.roundBraces.arrow)
        return;
    
    print(braceClose);
}

function isOneArgArrow(path) {
    if (path.type !== 'ArrowFunctionExpression')
        return false;
    
    const {params} = path.node;
    const [param] = params;
    
    if (params.length !== 1)
        return false;
    
    return param.type === 'Identifier';
}
