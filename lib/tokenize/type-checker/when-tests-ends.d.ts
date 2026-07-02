type WhenTestsEndsOverride = {
    log?: (message: string) => void;
    getCoverage?: () => Map<string, {
        covered: Set<number>;
        typeNames: unknown[];
    }>;
    report?: (coverage: Map<string, {
        covered: Set<number>;
        typeNames: unknown[];
    }>) => [number, string];
    [key: string]: unknown;
};

export function whenTestsEnds(overrides?: WhenTestsEndsOverride): number;

