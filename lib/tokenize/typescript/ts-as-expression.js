'use strict';

module.exports.TSAsExpression = {
    condition(path) {
        return path.parentPath.isMemberExpression();
    },
    before(path, {write}) {
        write('(');
    },
    print(path, {print}) {
        print('__expression');
        print(' as ');
        print('__typeAnnotation');
    },
    after(path, {write}) {
        write(')');
    },
};
