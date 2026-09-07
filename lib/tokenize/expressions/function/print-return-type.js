export const printReturnType = (path, printer) => {
    const {print} = printer;
    const {returnType} = path.node;
    
    if (returnType) {
        print(':');
        print.space();
        print('__returnType');
    }
};
