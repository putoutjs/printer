import {writeTemplateLiteral} from '../../literals/write-template-literal.js';

export const TSTemplateLiteralType = (path, printer) => {
    const quasis = path.get('quasis');
    const types = path.get('types');
    
    writeTemplateLiteral(quasis, types, printer);
};
