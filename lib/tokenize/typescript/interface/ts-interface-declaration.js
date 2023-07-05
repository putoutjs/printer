'use strict';

const {isNext} = require('../../is');

module.exports.TSInterfaceDeclaration = {
    print(path, {print}) {
        print('interface ');
        print('__id');
        print('__body');
    },
    afterSatisfy: () => [isNext],
    after(path, {print}) {
        print.breakline();
        print.breakline();
    },
};
