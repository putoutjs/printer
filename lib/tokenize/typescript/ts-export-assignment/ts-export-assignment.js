'use strict';

module.exports.TSExportAssignment = (path, {print}) => {
    print('export = ');
    print('__expression');
    print(';');
};
