import {Utils} from "../../../../math/utils.js";

export class Layer {
    constructor(x, y, width, height) {
        this.x = this.xPrevious = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    move(delta) {
        this.x -= delta;
    }

    update() {
        this.xPrevious = this.x;
    }

    render(context, time) {
        const x = Utils.lerp(this.xPrevious, this.x, time);

        context.fillStyle = "rgba(52,119,49,0.76)";
        context.beginPath();
        context.rect(x, this.y, this.width, this.height);
        context.fill();
    }
}