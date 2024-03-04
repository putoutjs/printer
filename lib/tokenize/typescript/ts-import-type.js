'use strict';

const {createImportExpression} = require('../expressions/import-expression');

module.exports.TSImportType = (path, printer, semantics) => {
    createImportExpression(path, printer, semantics, {
        source: 'argument',
    });
};
