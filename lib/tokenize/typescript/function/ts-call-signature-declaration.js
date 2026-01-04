import {printReturnType} from './print-return-type.js';
import {printParams} from '../../expressions/function/params.js';

export const TSCallSignatureDeclaration = (path, printer, semantics) => {
    const {print} = printer;
    printParams(path, printer, semantics);
    print(':');
    print.space();
    printReturnType(path, printer);
    print(';');
    print.newline();
};
