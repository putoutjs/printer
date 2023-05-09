'use strict';

const {
    isNext,
    exists,
    isLast,
} = require('../is');

module.exports.SwitchStatement = {
    print(path, {print, maybe, indent, write, traverse}) {
        indent();
        print('switch');
        print('(');
        print('__discriminant');
        print(') {');
        print.newline();
        
        const cases = path.get('cases');
        const n = cases.length - 1;
        
        for (const [index, switchCase] of cases.entries()) {
            const test = switchCase.get('test');
            
            indent();
            
            if (exists(test)) {
                write('case ');
                traverse(test);
            } else {
                write('default');
            }
            
            print(':');
            
            const isBlock = switchCase
                .get('consequent.0')
                .isBlockStatement();
            
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
            
            maybe.indent.dec(!isBlock);
            maybe.write.linebreak(index < n);
        }
        
        print.indent();
        print('}');
        
        if (!isNext(path) && !isLast(path))
            print.newline();
    },
    afterSatisfy: () => [
        isNext,
    ],
    after(path, {print}) {
        print.breakline();
        print.breakline();
    },
};
