'use strict';

module.exports.TSEnumMember = (path, {print, indent}) => {
    indent();
    print('__id');
    print.space();
    print('=');
    print.space();
    print('__initializer');
};
