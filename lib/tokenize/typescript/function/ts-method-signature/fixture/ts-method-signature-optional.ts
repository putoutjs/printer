export type StorageAdapter = {
    fork?(revision: unknown): unknown;
};