'use strict';

module.exports.ForInStatement = (path, {print}) => {
    print('for');
    print.space();
    print('(');
    print('__left');
    print(' in ');
    print('__right');
    print(')');
    
    if (path.get('body').isBlockStatement())
        print.space();
    
    print('__body');
};
