export const StaticBlock = (path, {print, traverse}) => {
    print('static ');
    print('{');
    print.breakline();
    
    for (const child of path.get('body')) {
        traverse(child);
    }
    
    print.indent();
    print('}');
    print.newline();
};
