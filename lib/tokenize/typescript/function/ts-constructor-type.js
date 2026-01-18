import {printParams} from '#print-params';
import {printReturnType} from './print-return-type.js';

export const TSConstructorType = (path, printer, semantics) => {
    const {print} = printer;
    
    print('new');
    print(' ');
    
    printParams(path, printer, semantics);
    print.space();
    print('=>');
    print.space();
    printReturnType(path, printer);
};
