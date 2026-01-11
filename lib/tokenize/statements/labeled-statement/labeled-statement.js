import {isInsideLabel} from '#is';

export const LabeledStatement = (path, {print, maybe}) => {
    maybe.indent(!isInsideLabel(path));
    print('__label');
    print(':');
    print.space();
    print('__body');
};
