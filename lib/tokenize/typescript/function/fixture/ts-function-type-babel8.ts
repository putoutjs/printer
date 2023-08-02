type Operator = {
    [index: string]: (...args: any[]) => OperationResult;
};