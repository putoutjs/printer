import {maybeParens} from '#maybe-parens';

export const ImportExpression = maybeParens({
    print: (path, printer) => {
        const {print, maybe} = printer;
        const {options} = path.node;
        
        print('import(');
        print('__source');
        
        maybe.print(options, ',');
        maybe.print.space(options);
        
        print('__options');
        print(')');
    },
});
