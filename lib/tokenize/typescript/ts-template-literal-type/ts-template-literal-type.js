'use strict';

const {writeTemplateLiteral} = require('../../literals/write-template-literal');

module.exports.TSTemplateLiteralType = (path, printer) => {
    const quasis = path.get('quasis');
    const types = path.get('types');
    
    writeTemplateLiteral(quasis, types, printer);
};
