'use strict';

const {isPrevBody} = require('../is');
const {hasPrevNewline} = require('../mark');
const isBodyLength = ({parentPath}) => parentPath.node?.body?.length > 2;

module.exports.ReturnStatement = (path, {indent, traverse, print}) => {
    if (!hasPrevNewline(path) && isBodyLength(path) || isPrevBody(path)) {
        print.indent();
        print.newline();
    }
    
    indent();
    print('return');
    
    const argPath = path.get('argument');
    
    if (argPath.node) {
        print(' ');
        traverse(argPath);
    }
    
    print(';');
    print.newline();
};
