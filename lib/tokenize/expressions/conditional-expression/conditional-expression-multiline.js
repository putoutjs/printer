export const ConditionalExpressionMultiline = (path, {print, indent}) => {
    print('__test');
    print.space();
    print('?');
    indent.inc();
    print.breakline();
    print('__consequent');
    print.space();
    print(':');
    print.breakline();
    indent.dec();
    print('__alternate');
};
