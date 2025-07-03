'use strict';

const {types} = require('@putout/babel');
const {isExportDeclaration} = types;

module.exports.printTrailingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    printComment();
    print.breakline();
};

module.exports.printTrailingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {maybe} = printer;
    const next = path.getNextSibling();
    
    maybe.print.breakline(!isExportDeclaration(next));
    printComment();
};
