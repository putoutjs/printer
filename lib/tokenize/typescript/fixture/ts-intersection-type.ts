type Test = Operator & OperatorStub & {
    equal: (result: unknown, expected: unknown, message?: string) => OperationResult;
};