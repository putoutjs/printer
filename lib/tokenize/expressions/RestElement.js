'use strict';

module.exports.RestElement = (path, {write, traverse}) => {
    write('...');
    traverse(path.get('argument'));
};
