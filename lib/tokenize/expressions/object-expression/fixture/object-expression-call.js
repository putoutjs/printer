const {parseLeadingComments} = require('../../../comments/comments');

if (a || wrongShorthand({computed, isAssign, keyPath, valuePath}))
    return;

parseLeadingComments(next, {print, maybe, indent}, semantics);

stringify({
    rules: {
        'remove-unused-variables': 'on',
    },
}, null, 4);

const expected = stringify({
    path: '/fixture/dir.zip/',
    files: [{
        name: 'dir',
        size: '0b',
        date: '28.08.2017',
        mode: 'rw- rw- rw-',
        type: 'directory',
        owner: 'root',
    }],
}, null, 4);