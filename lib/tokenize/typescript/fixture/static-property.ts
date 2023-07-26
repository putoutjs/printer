abstract class X {
    static #x?: boolean = true;
    private static z: number = 5;
    public static a(): boolean {
        this.#x = true;
        const y = true;
        
        return this.#x ? y : false;
    }
}