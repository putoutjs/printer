'use strict';

const WATER_MARK_BEFORE = '__putout_newline_before';
const WATER_MARK_AFTER = '__putout_newline_after';

module.exports.markBefore = markBefore;
module.exports.markAfter = markAfter;
module.exports.maybeMarkAfter = (a, path) => a && markAfter(path);

function markBefore(path) {
    path[WATER_MARK_BEFORE] = true;
}

function markAfter(path) {
    path[WATER_MARK_AFTER] = true;
}

module.exports.isMarkedAfter = isMarkedAfter;

function isMarkedAfter(path) {
    return path[WATER_MARK_AFTER];
}

module.exports.hasPrevNewline = (path) => {
    return isMarkedAfter(path.getPrevSibling());
};
