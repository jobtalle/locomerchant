import {Utils} from "../../../../math/utils.js";

export class Layer {
    constructor(x, y, width, height, sprite, depth) {
        this.x = this.xPrevious = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
        this.depth = depth;
    }

    move(delta) {
        if (this.depth > 0)
            this.x -= delta * this.depth;
        else
            this.x -= delta * (1 - this.depth * 4);
    }

    update() {
        this.xPrevious = this.x;
    }

    render(context, time) {
        const x = Utils.lerp(this.xPrevious, this.x, time);

        this.sprite.draw(context, x, this.y);
    }
}