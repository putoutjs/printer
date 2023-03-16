'use strict';

module.exports.isPrevBody = (path) => path.getPrevSibling().isBlockStatement();
