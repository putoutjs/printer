'use strict';

module.exports.SpreadElement = (path, {write, traverse}) => {
    write('...');
    traverse(path.get('argument'));
};
