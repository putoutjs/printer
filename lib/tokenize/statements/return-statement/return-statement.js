'use strict';

const {
    isPrevBody,
    noTrailingComment,
    isLast,
} = require('../../is');

const {hasPrevNewline} = require('../../mark');
const {maybeSpaceAfterKeyword} = require('./maybe-space-after-keyword');

const isBodyLength = ({parentPath}) => parentPath.node?.body?.length > 2;

module.exports.ReturnStatement = {
    beforeIf(path) {
        return !hasPrevNewline(path) && isBodyLength(path) || isPrevBody(path);
    },
    before(path, {print}) {
        print.linebreak();
    },
    print(path, {indent, print}) {
        indent();
        print('return');
        maybeSpaceAfterKeyword(path, {
            print,
        });
        print('__argument');
        print(';');
    },
    afterIf: (path) => {
        if (isLast(path))
            return false;
        
        return noTrailingComment(path);
    },
    after(path, {print}) {
        print.newline();
    },
};
