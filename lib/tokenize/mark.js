'use strict';

const WATER_MARK_BEFORE = '__putout_newline_before';
const WATER_MARK_AFTER = '__putout_newline_after';

module.exports.markBefore = markBefore;
module.exports.markAfter = markAfter;

function markBefore(path) {
    path[WATER_MARK_BEFORE] = true;
}

function markAfter(path) {
    path[WATER_MARK_AFTER] = true;
}

module.exports.isMarkedBefore = isMarkedBefore;
module.exports.isMarkedAfter = isMarkedAfter;

function isMarkedBefore(path) {
    return path[WATER_MARK_BEFORE];
}

function isMarkedAfter(path) {
    return path[WATER_MARK_AFTER];
}

module.exports.hasPrevNewline = (path) => {
    return isMarkedAfter(path.getPrevSibling());
};

module.exports.maybeMarkAfter = (a, path) => a && markAfter(path);

module.exports.isMarkedParentBefore = (path) => {
    return isMarkedBefore(path.parentPath);
};

module.exports.isMarkedPrevAfter = (path) => {
    return isMarkedAfter(path.getPrevSibling());
};
