import {isGapRight} from '../../comments/comments-printer/operand-comments.js';

export const hasTernaryComments = (path) => {
    if (isGapRight(path.get('consequent')))
        return true;
    
    return isGapRight(path.get('alternate'));
};
