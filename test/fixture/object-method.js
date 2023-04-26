'use strict';

module.exports.traverse = ({push}) => ({
    VariableDeclarator(path, hello) {},
});

parse({
    exit(path) {
        const {node} = path;
        convertNodeComments(node);
    },
});

const {code} = await svelte.preprocess(rawSource, {
    async style({content}) {
        style({
            content,
        });
    },
});