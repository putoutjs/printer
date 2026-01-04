import {writeTemplateLiteral} from './write-template-literal.js';

export const TemplateLiteral = (path, printer) => {
    const expressions = path.get('expressions');
    const quasis = path.get('quasis');
    
    writeTemplateLiteral(quasis, expressions, printer);
};
