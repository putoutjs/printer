type TypeChecker = (path: unknown, options?: Record<string, unknown>) => boolean;
type CoverageEntry = {
    covered: Set<number>;
    typeNames: unknown[];
};
type InstrumentOverride = {
    env?: {
        TYPE_CHECK?: string;
        [key: string]: unknown;
    };
    coverage?: Map<string, CoverageEntry>;
    instrumentName?: string;
    [key: string]: unknown;
};

export function instrument(typeNames: unknown[], fn: TypeChecker, overrides?: InstrumentOverride): TypeChecker;

export function getCoverage(): Map<string, CoverageEntry>;

