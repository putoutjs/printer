'use strict';

const {createImportExpression} = require('../../expressions/import-expression');

module.exports.TSImportType = (path, printer) => {
    createImportExpression(path, printer);
};
