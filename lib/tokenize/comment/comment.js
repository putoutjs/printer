'use strict';

const {parseLeadingComments} = require('./parse-leading-comments');
const {parseTrailingComments} = require('./parse-trailing-comments');
const {parseComments} = require('./parse-comments');

module.exports.parseLeadingComments = parseLeadingComments;
module.exports.parseTrailingComments = parseTrailingComments;
module.exports.parseComments = parseComments;
