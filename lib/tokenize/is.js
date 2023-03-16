'use strict';

module.exports.isPrevBody = (path) => path.getPrevSibling().isBlockStatement();
module.exports.isNext = (path) => path.getNextSibling().node;
