declare function test(message: string, fn: (t: Test) => void, options?: TestOptions): void;
declare const skip: typeof test;
declare const only: typeof test;