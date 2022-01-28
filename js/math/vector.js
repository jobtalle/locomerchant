export class Vector {
    constructor(x = 0, y = x) {
        this.x = x;
        this.y = y;
    }

    set(other) {
        this.x = other.x;
        this.y = other.y;

        return this;
    }

    copy() {
        return new Vector(this.x, this.y);
    }
}