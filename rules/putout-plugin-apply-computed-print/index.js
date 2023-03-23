'use strict';

module.exports.report = () => `Use print('__path') instead of path.get(__path)`;

module.exports.replace = () => ({
    'print(path.get(__a))': ({__a}) => {
        __a.value = '__' + __a.value;
        return 'print(__a)';
    },
});

