import {hasDecorators} from '#is';
import {printParams} from '#params';

export const printFunctionParams = (path, printer, semantics) => {
    const params = path.get('params');
    const isNewline = params.filter(hasDecorators).length;
    
    const printSpace = createPrintSpace({
        isNewline,
        printer,
    });
    
    const printAfterOpen = createPrintAfterOpen({
        type: 'inc',
        printer,
        isNewline,
    });
    
    const printBeforeClose = createPrintAfterOpen({
        type: 'dec',
        printer,
        isNewline,
    });
    
    printParams(path, printer, semantics, {
        printAfterOpen,
        printSpace,
        printBeforeClose,
    });
};

const createPrintAfterOpen = ({isNewline, printer, type}) => () => {
    if (!isNewline)
        return;
    
    const {indent, print} = printer;
    
    indent[type]();
    
    print.breakline();
};

export const createPrintSpace = ({isNewline, printer}) => () => {
    const {print} = printer;
    
    if (!isNewline)
        return print.space();
    
    print.breakline();
};
