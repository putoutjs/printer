import {printAttributes} from '#import-attributes';

export const ExportAllDeclaration = (path, printer) => {
    const {print} = printer;
    const {exportKind} = path.node;
    
    print('export ');
    
    if (exportKind === 'type')
        print('type ');
    
    print('* from ');
    print('__source');
    printAttributes(path, printer);
    print(';');
    print.newline();
};
