export type OmitIndexSignature<ObjectType> = {
    [KeyType in keyof ObjectType as
        {} extends Record<KeyType, unknown>
            ? never
            : KeyType]: ObjectType[KeyType];
};

export type OmitIndex<ObjectType> = {
    [KeyType in keyof ObjectType as KeyType]: ObjectType[KeyType];
};