import {isNext} from '../../is.js';

export const TSExportAssignment = {
    print: (path, {print}) => {
        print('export = ');
        print('__expression');
        print(';');
    },
    afterSatisfy: () => [isNext],
    after: (path, {print}) => {
        print.newline();
    },
};
