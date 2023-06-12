const {parseLeadingComments} = require("../../../comments");

if (a || wrongShorthand({computed, isAssign, keyPath, valuePath}))
    return;

parseLeadingComments(next, {print, maybe, indent}, semantics);