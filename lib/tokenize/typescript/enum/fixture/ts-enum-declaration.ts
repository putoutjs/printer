const enum Constants {
    /**
     * The amount of pixel padding to allow in each row. Setting this to zero would make the atlas
     * page pack as tightly as possible, but more pages would end up being created as a result.
     */
    ROW_PIXEL_THRESHOLD = 2,
    /**
     * The maximum texture size regardless of what the actual hardware maximum turns out to be. This
     * is enforced to ensure uploading the texture still finishes in a reasonable amount of time. A
     * 4096 squared image takes up 16MB of GPU memory.
     */
    FORCED_MAX_TEXTURE_SIZE = 4096,
}