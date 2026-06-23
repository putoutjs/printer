export declare namespace template {
    export function ast(source: string, options?: Record<string, unknown>): Node;
    export function program(source: string, options?: Record<string, unknown>): (...args: unknown[]) => Node;
    export function extractExpression(node: Node): Node;
}

export function generate(node: Node, options?: Record<string, unknown>, sourceMaps?: Record<string, unknown>): string;
