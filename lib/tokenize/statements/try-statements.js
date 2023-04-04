'use strict';

const {isNext} = require('../is');

module.exports.TryStatement = (path, {print, maybe}) => {
    const finalizer = path.get('finalizer');
    print.indent();
    print('try ');
    print('__block');
    print('__handler');
    
    if (finalizer.node) {
        print(' ');
        print('finally');
        print(' ');
        print(finalizer);
    }
    
    print.newline();
    maybe.print.breakline(isNext(path));
};

module.exports.CatchClause = (path, {print}) => {
    const param = path.get('param');
    const body = path.get('body');
    
    print(' ');
    print('catch ');
    
    if (param.node) {
        print('(');
        print(param);
        print(') ');
    }
    
    print(body);
};
