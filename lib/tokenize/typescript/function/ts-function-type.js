import {printParams} from '../../expressions/function/params.js';
import {printReturnType} from './print-return-type.js';
import {maybeParens} from '../../maybe/maybe-parens.js';

export const TSFunctionType = maybeParens((path, printer, semantics) => {
    const {print} = printer;
    
    printParams(path, printer, semantics);
    print.space();
    print('=>');
    print.space();
    printReturnType(path, printer);
});
