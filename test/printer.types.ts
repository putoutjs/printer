import {parse} from '@putout/babel';
import {print} from '..';

const ast = parse('const {a = 5} = b');

print(ast, {
    format: {
        indent: '    ',
        newline: '\n',
        space: ' ',
        splitter: '\n',
        quote: `'`,
    },
    semantics: {
        comments: true,
        roundBraces: true,
        maxSpecifiersInOneLine: 2,
        maxElementsInOneLine: 3,
        maxVariablesInOneLine: 4,
        maxPropertiesInOneLine: 2,
        trailingComma: true,
    },
    visitors: {
        AssignmentPattern(_, {print}) {
            print('/* [hello world] */= ');
            print('__right');
        },
    },
});
