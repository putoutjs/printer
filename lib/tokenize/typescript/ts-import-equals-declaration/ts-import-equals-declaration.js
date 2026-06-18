import {isLast} from '#is';

export const TSImportEqualsDeclaration = (path, {print, maybe}) => {
    maybe.print(path.node.isExport, 'export ');
    print('import ');
    print('__id');
    print.space();
    print('=');
    print.space();
    print('__moduleReference');
    print(';');
    
    if (!isLast(path) && !isLast(path.parentPath))
        print.newline();
};
