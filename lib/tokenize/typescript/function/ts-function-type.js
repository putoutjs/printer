import {maybeParens} from '#maybe-parens';
import {printParams} from '#print-params';
import {printReturnType} from './print-return-type.js';

export const TSFunctionType = maybeParens((path, printer, semantics) => {
    const {print} = printer;
    
    printParams(path, printer, semantics);
    print.space();
    print('=>');
    print.space();
    printReturnType(path, printer);
});
