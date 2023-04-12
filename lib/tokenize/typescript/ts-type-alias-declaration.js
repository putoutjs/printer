'use strict';

const {isLast} = require('../is');
module.exports.TSTypeAliasDeclaration = {
    print(path, {print}) {
        print('type ');
        print('__id');
        print.space();
        print('=');
        print.space();
        print('__typeAnnotation');
        print(';');
    },
    afterIf(path) {
        return !isLast(path);
    },
    after(path, {print}) {
        print.newline();
    },
};

