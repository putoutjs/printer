import {exists} from '../../is.js';
import {maybePrintTypeAnnotation} from '../../maybe/maybe-type-annotation.js';
import {maybeDecorators} from '../../maybe/maybe-decorators.js';
import {printKey} from '../object-expression/print-key.js';
import {printKind} from '../function/kind.js';

const processClassProperty = maybeDecorators((path, printer, semantics, {accessor} = {}) => {
    const {node} = path;
    const {
        accessibility,
        declare,
        optional,
    } = node;
    
    const {print, maybe} = printer;
    
    maybe.print(accessor, 'accessor ');
    
    const value = path.get('value');
    
    maybe.print(declare, 'declare ');
    maybe.print(accessibility, `${accessibility} `);
    maybe.print(node.static, 'static ');
    maybe.print(node.readonly, 'readonly ');
    
    printKind(path, printer);
    printKey(path, printer);
    
    maybe.print(optional, '?');
    
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

export const ClassProperty = processClassProperty;
export const ClassPrivateProperty = processClassProperty;

export const PrivateName = (path, {print}) => {
    print('#');
    print('__id');
};

export const ClassAccessorProperty = (path, printer, semantics) => {
    processClassProperty(path, printer, semantics, {
        accessor: true,
    });
};
