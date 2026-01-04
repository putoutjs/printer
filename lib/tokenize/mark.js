const WATER_MARK_BEFORE = '__putout_newline_before';
const WATER_MARK_AFTER = '__putout_newline_after';

export const maybeMarkAfter = (a, path) => a && markAfter(path);

export function markBefore(path) {
    path[WATER_MARK_BEFORE] = true;
}

export function markAfter(path) {
    path[WATER_MARK_AFTER] = true;
}

export function isMarkedAfter(path) {
    return path[WATER_MARK_AFTER];
}

export const hasPrevNewline = (path) => {
    return isMarkedAfter(path.getPrevSibling());
};
