import {maybeParens} from '#maybe-parens';

export const TSInferType = maybeParens((path, {print}) => {
    print('infer ');
    print('__typeParameter');
});
