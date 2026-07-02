type CoverageEntry = {
    covered: Set<number>;
    typeNames: unknown[];
};

export function report(coverage: Map<string, CoverageEntry>): [number, string];

