namespace N {
    export type Comment = string;
}

export default class State {
    tokens: Array<N.Comment> = [];
}

export interface IInputHandlingTerminal {}