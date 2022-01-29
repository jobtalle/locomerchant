import {Utils} from "../../../math/utils.js";

export class SmokePoint {
    constructor(position, velocity) {
        this.position = position;
        this.positionPrevious = this.position.copy();
        this.velocity = velocity;
    }

    update() {
        this.positionPrevious.set(this.position);
        this.position.add(this.velocity);
    }

    getX(time) {
        return Utils.lerp(this.positionPrevious.x, this.position.x, time);
    }

    getY(time) {
        return Utils.lerp(this.positionPrevious.y, this.position.y, time);
    }
}