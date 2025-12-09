'use strict';

const {isPrev} = require('#is');
const noop = () => {};

module.exports.printLeadingCommentLine = (path, printer, semantics, {printComment}) => {
    const {print} = printer;
    print.breakline();
    printComment();
    print.breakline();
};

module.exports.printLeadingCommentBlock = (path, printer, semantics, {printComment}) => {
    const {print, maybe} = printer;
    
    maybe.print.breakline(!isPrev(path));
    printComment();
    print.indent();
};

module.exports.printTrailingCommentBlock = noop;
