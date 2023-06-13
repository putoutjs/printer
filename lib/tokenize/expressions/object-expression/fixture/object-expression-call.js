const {parseLeadingComments} = require("../../../comments");

if (a || wrongShorthand({computed, isAssign, keyPath, valuePath}))
    return;

parseLeadingComments(next, {print, maybe, indent}, semantics);

stringify({
    rules: {
        'remove-unused-variables': 'on',
    },
}, null, 4);