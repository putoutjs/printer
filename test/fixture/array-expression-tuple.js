compile(source, {
    keywords: [
        keywordFn,
        function id(Parser) {
            const {keywordTypes} = Parser.acorn;
            
            return class extends Parser {
            };
        },
    ],
    rules: {
        declare: ['on', {
            declarations: {
                id: 'const id = (a) => a',
            },
        }],
    },
});