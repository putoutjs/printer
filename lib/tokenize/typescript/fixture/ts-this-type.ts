export default class Vector {
    add(v: Vector): this {
        this.x += v.x;
        this.y += v.y;
        
        return this;
    }
}