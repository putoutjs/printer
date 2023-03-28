'use strict';

const isParentProgram = (path) => path.parentPath?.isProgram();
const isParentBlock = (path) => path.parentPath.isBlockStatement();
const isNext = (path) => path.getNextSibling().node;

module.exports.isFirst = (path) => path.node === path.parentPath.node.body[0];
module.exports.isPrevBody = (path) => path.getPrevSibling().isBlockStatement();
module.exports.isNext = isNext;
module.exports.isParentProgram = isParentProgram;
module.exports.isParentBlock = isParentBlock;
module.exports.isLast = (path) => isParentProgram(path) && !isNext(path);

module.exports.isCoupleLines = (path) => {
    const start = path.node?.loc?.start?.line;
    const end = path.node?.loc?.end?.line;
    
    return end > start;
};
