export const ImportExpression = createImportExpression;

export function createImportExpression(path, printer) {
    const {print, maybe} = printer;
    const {options} = path.node;
    
    print('import(');
    print('__source');
    
    maybe.print(options, ',');
    maybe.print.space(options);
    
    print('__options');
    print(')');
}
