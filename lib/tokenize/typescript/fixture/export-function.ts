export function stub(arg?: unknown): Stub;
export interface OperatorStub {
    called: (fn: Stub, message?: string) => OperationResult;
}