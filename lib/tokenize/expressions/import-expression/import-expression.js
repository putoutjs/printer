import {maybeParens} from '#maybe-parens';

export const ImportExpression = maybeParens({
    print: (path, printer) => {
        const {print, maybe} = printer;
        const {sync, options} = path.node;
        
        print('import');
        maybe.print(sync, '.sync');
        print('(');
        print('__source');
        
        maybe.print(options, ',');
        maybe.print.space(options);
        
        print('__options');
        print(')');
    },
});
