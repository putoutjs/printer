import {printParams} from '#print-params';
import {printReturnType} from './print-return-type.js';

export const TSCallSignatureDeclaration = (path, printer, semantics) => {
    const {print} = printer;
    printParams(path, printer, semantics);
    print(':');
    print.space();
    printReturnType(path, printer);
    print(';');
    print.newline();
};
