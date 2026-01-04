import {hasLeadingComment} from '#is';

const noop = () => {};

export const printLeadingCommentLine = noop;
export const printLeadingCommentBlock = noop;

export const maybePrintComments = (path, {print}) => {
    if (hasLeadingComment(path)) {
        const {leadingComments} = path.node;
        
        for (const {type, value} of leadingComments) {
            if (type === 'CommentLine')
                print(`//${value}`);
            else
                print(`/*${value}*/`);
            
            print.breakline();
        }
    }
};
