import {printParams} from './params.js';
import {hasLeadingComment} from '../../is.js';

const isAllParamsHasLeadingComments = (path) => {
    const params = path.get('params');
    let commentsCount = 0;
    let decoratorsCount = 0;
    
    for (const param of params) {
        const decorators = param.get('decorators');
        
        if (!decorators.length)
            continue;
        
        const [firstDecorator] = decorators;
        ++decoratorsCount;
        
        if (hasLeadingComment(firstDecorator))
            ++commentsCount;
    }
    
    return commentsCount === decoratorsCount;
};

const hasDecorators = ({decorators}) => decorators?.length;

export const printFunctionParams = (path, printer, semantics) => {
    const {params} = path.node;
    const isNewline = params.filter(hasDecorators).length;
    const isAllHasComments = isAllParamsHasLeadingComments(path);
    
    const printSpace = createPrintSpace({
        isNewline,
        printer,
    });
    
    const printAfterOpen = createPrintAfterOpen({
        type: 'inc',
        printer,
        isNewline,
        isAllHasComments,
    });
    
    const printBeforeClose = createPrintBeforeClose({
        type: 'dec',
        printer,
        isNewline,
        isAllHasComments,
    });
    
    printParams(path, printer, semantics, {
        printAfterOpen,
        printSpace,
        printBeforeClose,
    });
};

const createPrintAfterOpen = ({isNewline, isAllHasComments, printer, type}) => () => {
    if (!isNewline)
        return;
    
    const {indent, print} = printer;
    
    if (!isAllHasComments)
        indent[type]();
    
    print.breakline();
};

const createPrintBeforeClose = ({isNewline, printer, isAllHasComments, type}) => () => {
    if (!isNewline)
        return;
    
    const {indent, print} = printer;
    
    if (!isAllHasComments)
        indent[type]();
    
    print.breakline();
};

export const createPrintSpace = ({isNewline, printer}) => () => {
    const {print} = printer;
    
    if (!isNewline)
        return print.space();
    
    print.breakline();
};
