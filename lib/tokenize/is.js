'use strict';

const isParentProgram = (path) => path.parentPath?.isProgram();
const isParentBlock = (path) => path.parentPath.isBlockStatement();
const isNext = (path) => path.getNextSibling().node;
const isNextParent = (path) => path.parentPath.getNextSibling().node;
const isLast = (path) => isParentProgram(path) && !isNext(path);

module.exports.isFirst = (path) => path.node === path.parentPath.node.body[0];
module.exports.isPrevBody = (path) => path.getPrevSibling().isBlockStatement();
module.exports.isNext = isNext;
module.exports.isNextParent = isNextParent;
module.exports.isParentProgram = isParentProgram;
module.exports.isParentBlock = isParentBlock;
module.exports.isLast = isLast;
module.exports.isParentLast = (path) => isLast(path.parentPath);
module.exports.isCoupleLines = isCoupleLines;
module.exports.isNextCoupleLines = isNextCoupleLines;

function isCoupleLines(path) {
    const start = path.node?.loc?.start?.line;
    const end = path.node?.loc?.end?.line;
    
    return end > start;
}

function isNextCoupleLines(path) {
    return isCoupleLines(path.getNextSibling());
}
