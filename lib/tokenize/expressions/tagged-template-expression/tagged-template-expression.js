import {maybeParens} from '#maybe-parens';

export const TaggedTemplateExpression = maybeParens({
    print: (path, printer) => {
        const {print} = printer;
        
        print('__tag');
        print('__quasi');
    },
});
