import {maybeInsideBinary} from './maybe-inside-binary.js';

export const concatenate = maybeInsideBinary((path, {print}) => {
    print('__left');
    print.space();
    print('+');
    print.breakline();
    print('__right');
});
