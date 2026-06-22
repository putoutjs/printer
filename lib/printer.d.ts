import {types} from '@putout/babel';

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

export type Print = (input: string | types.Node) => void;
export type Indent = () => void;
export type Traverse = (input: types.Node) => void;
export type MaybeCondition = (condition: boolean) => void;

export type MaybeIndent = {
    (condition: boolean): void;
    inc: MaybeCondition;
    dec: MaybeCondition;
};

export declare const MaybeIndent: MaybeIndent;
export type MaybePrint = (condition: boolean, input: string | types.Node) => void;
export type MaybeTraverse = (condition: boolean, input: types.Node) => void;

export interface Maybe {
    print: MaybePrint;
    traverse: MaybeTraverse;
    indent: typeof MaybeIndent;
}

export interface Printer {
    print: Print;
    maybe: Maybe;
    indent: Indent;
    traverse: Traverse;
}

export type Visitor = (path: types.Node, printer: Printer, semantics?: Semantics) => void;

export interface Visitors {
    [name: string]: Visitor;
}

export interface Options {
    format?: Format;
    semantics?: Semantics;
    visitors?: Visitors;
}

export function print(ast: types.Node, options?: Options): string;

export declare function maybeVisitor(plugin: Visitor, path: types.Node, printer: Print, semantics: Semantics): void;
export const visitors: Visitors;
