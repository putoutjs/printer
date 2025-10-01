'use strict';

const {writeTemplateLiteral} = require('./write-template-literal');

module.exports.TemplateLiteral = (path, printer) => {
    const expressions = path.get('expressions');
    const quasis = path.get('quasis');
    
    writeTemplateLiteral(quasis, expressions, printer);
};
