'use strict';

const {isNext} = require('../../is');

module.exports.TSExportAssignment = {
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
