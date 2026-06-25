import {maybeParens} from '#maybe-parens';

export const TSAsExpression = maybeParens((path, {print}) => {
    print('__expression');
    print(' as ');
    print('__typeAnnotation');
});
