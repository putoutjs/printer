import {printParams} from '#print-params';
import {printKind} from '../../expressions/function/kind.js';
import {
    hasReturnType,
    printReturnType,
} from './print-return-type.js';
import {printKey} from '../../expressions/object-expression/print-key.js';

export const TSMethodSignature = (path, printer, semantics) => {
    const {write} = printer;
    
    printKind(path, printer);
    printKey(path, printer);
    printParams(path, printer, semantics);
    
    if (hasReturnType(path)) {
        write(':');
        write.space();
        printReturnType(path, printer);
    }
    
    write(';');
    write.newline();
};
