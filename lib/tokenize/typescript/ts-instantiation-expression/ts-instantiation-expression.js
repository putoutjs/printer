import {maybeParens} from '#maybe-parens';

export const TSInstantiationExpression = maybeParens((path, {print}) => {
    print('__expression');
    print('__typeArguments');
});
