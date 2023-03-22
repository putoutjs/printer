'use strict';

module.exports.parseComments = (path, {write}) => {
    const {leadingComments} = path.node;
    
    if (leadingComments)
        parseLeadingComments(path, {write});
};

function parseLeadingComments(path, {write}) {
    const {leadingComments} = path.node;
    
    for (const {value} of leadingComments) {
        write(`//${value}`);
        write.newline();
    }
}
