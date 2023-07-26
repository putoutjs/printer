'use strict';

module.exports.TSEnumMember = (path, {print, indent}) => {
    const {initializer} = path.node;
    indent();
    print('__id');
    
    if (initializer) {
        print.space();
        print('=');
        print.space();
        print('__initializer');
    }
};
