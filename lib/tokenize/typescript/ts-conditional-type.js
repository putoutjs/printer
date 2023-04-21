'use strict';

module.exports.TSConditionalType = (path, {print, indent}) => {
    indent.inc();
    print.breakline();
    print('__checkType');
    print(' extends ');
    print('__extendsType');
    
    indent.inc();
    print.breakline();
    
    print('? ');
    print('__trueType');
    
    print.breakline();
    
    print(': ');
    print('__falseType');
    
    indent.dec();
    indent.dec();
};
