export abstract class Option<T> {
    static none() {
        return new None();
    }
    
    static some<T>(value: T) {
        return new Some(value);
    }
}