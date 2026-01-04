import {createImportExpression} from '../../expressions/import-expression.js';

export const TSImportType = (path, printer) => {
    createImportExpression(path, printer);
};
