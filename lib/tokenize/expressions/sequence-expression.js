'use strict';

module.exports.SequenceExpression = {
    condition({parentPath}) {
        if (parentPath.isArrowFunctionExpression())
            return true;
        
        if (parentPath.isExportDeclaration())
            return true;
        
        return false;
    },
    before(path, {write}) {
        write('(');
    },
    print(path, {maybe, print}) {
        const expressions = path.get('expressions');
        const n = expressions.length - 1;
        
        for (const [index, expression] of expressions.entries()) {
            print(expression);
            maybe.print(index < n, ',');
            maybe.print(index < n, ' ');
        }
    },
    after(path, {write}) {
        write(')');
    },
};

