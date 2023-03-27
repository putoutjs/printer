'use strict';

module.exports.isFirst = (path) => path.node === path.parentPath.node.body[0];
module.exports.isPrevBody = (path) => path.getPrevSibling().isBlockStatement();
module.exports.isNext = (path) => path.getNextSibling().node;
module.exports.isProgramParent = (path) => path.parentPath?.isProgram();
module.exports.isNextParent = (path) => path.parentPath.getNextSibling().node;

module.exports.isCoupleLines = (path) => {
    const start = path.node?.loc?.start?.line;
    const end = path.node?.loc?.end?.line;
    
    return end > start;
};
