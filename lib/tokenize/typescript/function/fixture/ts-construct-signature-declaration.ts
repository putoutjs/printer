/** Params constructor type. */
export interface IParamsConstructor {
    new(maxLength: number, maxSubParamsLength: number): IParams;
    fromArray(values: ParamsArray): IParams;
    fromArray(): IParams;
}