'use strict';

module.exports.TSParameterProperty = (path, {print, maybe}) => {
    const {
        decorators,
        readonly,
        accessibility,
    } = path.node;
    
    const decoratorsLength = decorators?.length;
    
    maybe.print.breakline(decoratorsLength);
    
    if (decorators)
        for (const decorator of path.get('decorators')) {
            print.indent();
            print(decorator);
        }
    
    maybe.print.breakline(decoratorsLength);
    maybe.indent(decoratorsLength);
    
    if (accessibility) {
        print(accessibility);
        print.space();
    }
    
    if (readonly) {
        print('readonly');
        print.space();
    }
    
    print('__parameter');
    maybe.print(decoratorsLength, ',');
    maybe.print.breakline(decoratorsLength);
};
