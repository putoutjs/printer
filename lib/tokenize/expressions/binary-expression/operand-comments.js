import {
    isGapRight,
    printGapSameLine,
    printGapOwnLine,
} from '../../comments/comments-printer/operand-comments.js';

export const hasBinaryComments = (path) => isGapRight(path.get('right'));

export const printBinaryGap = (path, printer) => {
    const right = path.get('right');
    
    printGapSameLine(right, printer);
    printer.print.breakline();
    printGapOwnLine(right, printer);
};

export const printBinaryWithComments = (path, printer) => {
    const {print, indent} = printer;
    
    print('__left');
    print.space();
    print(path.node.operator);
    indent.inc();
    printBinaryGap(path, printer);
    print('__right');
    indent.dec();
};
