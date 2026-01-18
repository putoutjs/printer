import {printParams} from '#print-params';
import {
    hasReturnType,
    printReturnType,
} from './print-return-type.js';

export const TSConstructSignatureDeclaration = (path, printer, semantics) => {
    const {write} = printer;
    
    write('new');
    printParams(path, printer, semantics);
    
    if (hasReturnType(path)) {
        write(':');
        write.space();
        printReturnType(path, printer);
    }
    
    write(';');
    write.newline();
};
