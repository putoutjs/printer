'use strict';

module.exports.getDirectives = (path) => !path.node.directives ? [] : path.get('directives');
