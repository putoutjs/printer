import {Node} from '@putout/babel';

export interface Format {
    indent: string;
    newline: string;
    space: string;
    splitter: string;
    quote: string;
}

export interface Semantics {
    roundBraces: boolean;
    comments: boolean;
    maxPropertiesInOneLine: number;
    maxSpecifiersInOneLine: number;
    maxElementsInOneLine: number;
    maxVariablesInOneLine: number;
    trailingComma: boolean;
}

export type Print = (input: string | Node) => void;

export type Indent = () => void;

export type Traverse = (input: Node) => void;

export type MaybeCondition = (condition: boolean) => void;

export type MaybeIndent = {
    (condition: boolean): void;
    inc: MaybeCondition;
    dec: MaybeCondition;
};

export type MaybePrint = (condition: boolean, input: string | Node) => void;

export type MaybeTraverse = (condition: boolean, input: Node) => void;

export interface Maybe {
    print: MaybePrint;
    traverse: MaybeTraverse;
    indent: MaybeIndent;
}

export interface Printer {
    print: Print;
    maybe: Maybe;
    indent: Indent;
    traverse: Traverse;
}

export type Visitor = (path: Node, printer: Printer, semantics?: Semantics) => void;

export interface Visitors {
    [name: string]: Visitor;
}

export interface Options {
    format?: Format;
    semantics?: Semantics;
    visitors?: Visitors;
}

export function print(ast: Node, options?: Options): string;

export declare function maybeVisitor(plugin: Visitor, path: Node, printer: Print, semantics: Semantics): void;
export const visitors: Visitors;
