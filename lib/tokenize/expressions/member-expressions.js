'use strict';

module.exports.MemberExpression = (path, {print}) => {
    const {computed} = path.node;
    
    print('__object');
    
    if (computed) {
        print('[');
        print('__property');
        print(']');
        
        return;
    }
    
    print('.');
    print('__property');
};

module.exports.OptionalMemberExpression = (path, {print}) => {
    print('__object');
    print('?.');
    print('__property');
};

