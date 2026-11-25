import {maybeInsideBinary} from './maybe-inside-binary.js';
import {printBinaryGap} from './operand-comments.js';

export const concatenate = maybeInsideBinary((path, printer) => {
    const {print} = printer;
    print('__left');
    print.space();
    print('+');
    printBinaryGap(path, printer);
    print('__right');
});
