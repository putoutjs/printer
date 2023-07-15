class X {
    *walkNode(node) {
        yield* this._adapterOptions.walkNode(node);
    }
}