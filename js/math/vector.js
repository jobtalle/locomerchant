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

    add(other) {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    copy() {
        return new Vector(this.x, this.y);
    }

    rotate(angle) {
        const x = this.x;
        const y = this.y;
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        this.x = c * x + s * y;
        this.y = -s * x + c * y;

        return this;
    }
}