'use strict';

module.exports.AssignmentPattern = (path, {write, traverse}) => {
    write(' = ');
    traverse(path.get('right'));
};
