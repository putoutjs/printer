type TypeChecker = (path: unknown, options?: Record<string, unknown>) => boolean;
type TypeCheckerOverride = {
    instrumentCoverage?: (typeNames: unknown[], fn: TypeChecker, overrides?: Record<string, unknown>) => TypeChecker;
    instrumentName?: string;
    [key: string]: unknown;
};

export function createTypeChecker(typeNames: unknown[], overrides?: TypeCheckerOverride): TypeChecker;

