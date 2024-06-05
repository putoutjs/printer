/** Params constructor type. */
const abc = 'hello';

export interface IParamsConstructor {
    new(maxLength: number, maxSubParamsLength: number): string;
    get [abc](): string;
    get fromArray(): string;
    set fromArray(values: string);
}