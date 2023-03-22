'use strict';

const {hasPrevNewline} = require('../mark');

const {isFirst} = require('../is');

module.exports.ForOfStatement = (path, {indent, print}) => {
    if (!isFirst(path) && !hasPrevNewline(path)) {
        print.indent();
        print.newline();
    }
    
    indent();
    print('for (');
    print('__left');
    print(' of ');
    print('__right');
    print(')');
    
    const bodyPath = path.get('body');
    
    if (bodyPath.isExpressionStatement()) {
        indent.inc();
        print.newline();
        print(bodyPath);
        indent.dec();
        print.newline();
    }
    
    if (bodyPath.isBlockStatement()) {
        print(' ');
        print(bodyPath);
    }
};
