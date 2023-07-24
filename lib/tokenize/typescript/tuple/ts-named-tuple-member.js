'use strict';

module.exports.TSNamedTupleMember = (path, {print}) => {
    print('__label');
    print(':');
    print.space();
    print('__elementType');
};
