class Path {
    async openReadStream() {
        this._stream = await this._openReadStream(this.entry);
        return this._stream;
    }
}