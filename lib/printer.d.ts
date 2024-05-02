import {types} from '@putout/babel';

interface Format {
    indent: string;
    newline: string;
    space: string;
    splitter: string;
    quote: string;
}

interface Semantics {
    roundBraces: boolean;
    comments: boolean;
    maxPropertiesInOneLine: number;
    maxSpecifiersInOneLine: number;
    maxElementsInOneLine: number;
    maxVariablesInOneLine: number;
    trailingComma: boolean;
}

type Print = (input: string | types.Node) => void;
type Indent = () => void;
type Traverse = (input: types.Node) => void;

declare function MaybeIndent(condition: boolean): void;
declare namespace MaybeIndent {
    type inc = (condition: boolean) => void;
    type dec = (condition: boolean) => void;
    
    export {
        inc,
        dec,
    };
}

type MaybePrint = (condition: boolean, input: string | types.Node) => void;
type MaybeTraverse = (condition: boolean, input: types.Node) => void;

interface Maybe {
    print: MaybePrint;
    traverse: MaybeTraverse;
    indent: typeof MaybeIndent;
}

interface Printer {
    print: Print;
    maybe: Maybe;
    indent: Indent;
    traverse: Traverse;
}

type Visitor = (path: types.Node, printer: Printer, semantics?: Semantics) => void;

interface Visitors {
    [name: string]: Visitor;
}

interface Options {
    format?: Format;
    semantics?: Semantics;
    visitors?: Visitors;
}

export function print(ast: types.Node, options?: Options): string;

