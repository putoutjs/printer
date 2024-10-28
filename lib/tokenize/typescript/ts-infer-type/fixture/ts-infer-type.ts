type ExtractArrayElementType<T extends readonly any[]> =
    T extends readonly (infer U)[]
        ? U
        : never;