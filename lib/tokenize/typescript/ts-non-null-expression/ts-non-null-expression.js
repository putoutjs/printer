import {maybeParens} from '#maybe-parens';

export const TSNonNullExpression = maybeParens((path, {print}) => {
    print('__expression');
    print('!');
});
