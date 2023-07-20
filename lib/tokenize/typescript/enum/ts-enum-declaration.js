'use strict';

module.exports.TSEnumDeclaration = (path, {print, traverse, indent}) => {
    print('const ');
    print('enum ');
    print('__id');
    print(' ');
    print('{');
    
    indent.inc();
    print.newline();
    
    for (const member of path.get('members')) {
        traverse(member);
        print(',');
        print.newline();
    }
    
    indent.dec();
    print('}');
};

