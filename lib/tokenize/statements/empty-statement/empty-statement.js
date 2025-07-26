'use strict';

const {isLast} = require('#is');

module.exports.EmptyStatement = (path, {write, maybe}) => {
    const {parentPath} = path;
    write(';');
    maybe.write.newline(!isLast(path) && !isLast(parentPath));
};

