'use strict';

const {isJSXElement} = require('@putout/babel').types;

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
        
        if (isJSXWithComment(path)) {
            print('(');
            print.breakline();
            print('__argument');
            print(');');
            
            return;
        }
        
        print('__argument');
        print(';');
    },
    afterIf: (path) => {
        if (isLast(path))
            return false;
        
        if (isLast(path.parentPath))
            return false;
        
        return noTrailingComment(path);
    },
    after(path, {print}) {
        print.newline();
    },
};
function isJSXWithComment(path) {
    const arg = path.node.argument;
    
    if (!arg)
        return;
    
    const {leadingComments} = arg;
    
    return isJSXElement(arg) && leadingComments?.length;
}
