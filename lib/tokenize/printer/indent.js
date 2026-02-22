import {TYPES} from '#types';

const {assign} = Object;

export const createIndent = ({format, addToken}) => {
    let i = 0;
    
    const incIndent = () => ++i;
    const decIndent = () => --i;
    
    const indent = () => {
        addToken({
            type: TYPES.INDENT,
            value: printIndent(i, format.indent),
        });
    };
    
    assign(indent, {
        inc: incIndent,
        dec: decIndent,
        getLevel() {
            return i;
        },
    });
    
    return indent;
};

function printIndent(i, indent) {
    let result = '';
    ++i;
    
    while (--i > 0) {
        result += indent;
    }
    
    return result;
}
