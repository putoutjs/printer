'use strict';

module.exports.SwitchStatement = (path, {print, maybe}) => {
    print('switch');
    print.space();
    print('(');
    print('__discriminant');
    print(') {');
    print.newline();
    
    const cases = path.get('cases');
    const n = cases.length - 1;
    
    for (const [index, switchCase] of cases.entries()) {
        print('case');
        print.space();
        print(switchCase.get('test'));
        print(':');
        
        const isBlock = switchCase.get('consequent.0').isBlockStatement();
        maybe.indent.inc(!isBlock);
        maybe.print.newline(!isBlock);
        
        for (const consequent of switchCase.get('consequent')) {
            if (!consequent.isBlockStatement()) {
                print(consequent);
                continue;
            }
            
            print.space();
            print(consequent);
        }
        
        if (index < n) {
            print.indent();
            maybe.indent.dec(!isBlock);
            print.newline();
        }
    }
    
    print('}');
};
