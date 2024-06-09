'use strict';

const {isCoupleLines} = require('../../is');
const {isMarkedAfter} = require('../../mark');
const {
    maybePrintLeftBrace,
    maybePrintRightBrace,
} = require('./maybe-write-brace');

module.exports.AssignmentExpression = (path, printer, semantics) => {
    const {print, maybe} = printer;
    const {operator} = path.node;
    
    maybe.print.breakline(isPrevCoupleLines(path));
    maybePrintLeftBrace(path, printer, semantics);
    print('__left');
    print.space();
    print(operator);
    print.space();
    print('__right');
    maybePrintRightBrace(path, printer, semantics);
};

const isPrevCoupleLines = ({parentPath}) => {
    const prev = parentPath.getPrevSibling();
    
    if (isMarkedAfter(prev))
        return false;
    
    if (!prev.node)
        return false;
    
    return isCoupleLines(prev);
};
