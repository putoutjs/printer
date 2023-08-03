'use strict';

const isParens = (path) => path.node.extra?.parenthesized;

module.exports.isParens = isParens;

module.exports.maybeParenOpen = (path, {maybe}) => {
    maybe.write(isParens(path), '(');
};

module.exports.maybeParenClose = (path, {maybe}) => {
    maybe.write(isParens(path), ')');
};
