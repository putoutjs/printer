import {printParams} from '#params';
import {printKind} from '../../../expressions/function/kind.js';
import {
    hasReturnType,
    printReturnType,
} from '../print-return-type.js';
import {printKey} from '../../../expressions/object-expression/print-key.js';

export const TSMethodSignature = (path, printer, semantics) => {
    const {write, maybe} = printer;
    const {optional} = path.node;
    
    printKind(path, printer);
    printKey(path, printer);
    maybe.print(optional, '?');
    printParams(path, printer, semantics);
    
    if (hasReturnType(path)) {
        write(':');
        write.space();
        printReturnType(path, printer);
    }
    
    write(';');
    write.newline();
};
