struct Point {
    x = 0;
    y = 0;
    get length() {
        return Math.hypot(this.x, this.y);
    }
}