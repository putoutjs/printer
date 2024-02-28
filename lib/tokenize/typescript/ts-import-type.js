'use strict';

module.exports.TSImportType = (path, {print, maybe}) => {
    print('import(');
    print('__argument');
    maybe.print(path.node.options, ',');
    print.space();
    print('__options');
    print(')');
};
