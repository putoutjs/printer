'use strict';

const insideArrow = ({parentPath}) => parentPath.isArrowFunctionExpression();
const insideExport = ({parentPath}) => parentPath.isExportDeclaration();
const insideConst = ({parentPath}) => parentPath.isVariableDeclarator();

module.exports.SequenceExpression = {
    satisfy: () => [
        insideArrow,
        insideExport,
        insideConst,
    ],
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
