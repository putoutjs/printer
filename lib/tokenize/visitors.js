'use strict';

const expressions = require('./expressions');
const statements = require('./statements');
const literals = require('./literals');
const typescript = require('./typescript');
const jsx = require('./jsx');

module.exports = {
    ...expressions,
    ...statements,
    ...literals,
    ...typescript,
    ...jsx,
};
