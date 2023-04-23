'use strict';

const {
    isPrevBody,
    noTrailingComment,
} = require('../is');

const {hasPrevNewline} = require('../mark');
const isBodyLength = ({parentPath}) => parentPath.node?.body?.length > 2;

module.exports.ReturnStatement = {
    beforeIf(path) {
        return !hasPrevNewline(path) && isBodyLength(path) || isPrevBody(path);
    },
    before(path, {print}) {
        print.indent();
        print.newline();
    },
    print(path, {indent, traverse, print}) {
        indent();
        print('return');
        
        const argPath = path.get('argument');
        
        if (argPath.node) {
            print(' ');
            traverse(argPath);
        }
        
        print(';');
    },
    afterSatisfy: () => [
        noTrailingComment,
    ],
    after(path, {print}) {
        print.newline();
    },
};
