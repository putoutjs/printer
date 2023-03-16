'use strict';

const WATER_MARK = '__putout_newline';

module.exports.mark = mark;

function mark(path) {
    path[WATER_MARK] = true;
}

module.exports.isMarked = isMarked;

function isMarked(path) {
    return path[WATER_MARK];
}

module.exports.hasPrevNewline = (path) => {
    return isMarked(path.getPrevSibling());
};

module.exports.maybeMark = (a, path) => a && mark(path);
