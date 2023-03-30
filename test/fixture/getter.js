const a = {
    get maxLength() {
        return this._maxLength;
    },
    set maxLength(a) {
        this._maxLength = a;
    },
};

class b {
    get maxLength() {
        return this._maxLength;
    }
    set maxLength(a) {
        return this._maxLength;
    }
}