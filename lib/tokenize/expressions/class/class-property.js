import {types} from '@putout/babel';
import {
    exists,
    hasTrailingComment,
} from '#is';
import {maybePrintTypeAnnotation} from '../../maybe/maybe-type-annotation.js';
import {maybeDecorators} from '../../maybe/maybe-decorators.js';
import {printKey} from '../object-expression/print-key.js';
import {printKind} from '../function/kind.js';

const {isClassAccessorProperty} = types;

const processClassProperty = maybeDecorators((path, printer) => {
    const {node} = path;
    const {
        accessibility,
        declare,
        optional,
        definite,
    } = node;
    
    const {print, maybe} = printer;
    
    if (isClassAccessorProperty(path))
        print('accessor ');
    
    const value = path.get('value');
    
    maybe.print(declare, 'declare ');
    maybe.print(accessibility, `${accessibility} `);
    maybe.print(node.static, 'static ');
    maybe.print(node.readonly, 'readonly ');
    
    printKind(path, printer);
    printKey(path, printer);
    
    maybe.print(optional, '?');
    maybe.print(definite, '!');
    
    maybePrintTypeAnnotation(path, printer);
    
    if (exists(value)) {
        print.space();
        print('=');
        print.space();
        print('__value');
    }
    
    print(';');
    print.newline();
});

export const ClassProperty = (path, printer, semantics) => {
    processClassProperty(path, printer, semantics);
};

const isFirst = (path) => path === path.parentPath.get('body')[0];

ClassProperty.printLeadingCommentLine = (path, printer, semantics, {index, isLast, isPreviousLine, printComment}) => {
    const {print, maybe} = printer;
    
    if (hasTrailingComment(path.getPrevSibling()))
        return;
    
    const first = isFirst(path);
    
    maybe.indent(index && first);
    maybe.print.breakline(isPreviousLine() && !first);
    printComment();
    
    if (isLast) {
        print.breakline();
        return;
    }
    
    print.newline();
};

ClassProperty.printLeadingCommentBlock = (path, printer, semantics, {index}) => {
    const {print} = printer;
    
    if (hasTrailingComment(path.getPrevSibling()))
        return;
    
    const {value} = path.node.leadingComments[index];
    
    print(`/*${value}*/`);
    print.breakline();
};
export const ClassPrivateProperty = processClassProperty;

export const PrivateName = (path, {print}) => {
    print('#');
    print('__id');
};

export const ClassAccessorProperty = (path, printer, semantics) => {
    processClassProperty(path, printer, semantics);
};
