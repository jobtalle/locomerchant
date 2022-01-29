import {Utils} from "../../../math/utils.js";

export class Wheel {
    constructor(position, radius, sprite) {
        this.position = position;
        this.radius = radius;
        this.sprite = sprite;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationPrevious = this.rotation;
    }

    move(delta) {
        this.rotation += delta / this.radius;

        if (this.rotation > Math.PI * 2) {
            this.rotation -= Math.PI * 2;
            this.rotationPrevious -= Math.PI * 2;
        }
    }

    update() {
        this.rotationPrevious = this.rotation;
    }

    render(context, time) {
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(Utils.lerp(this.rotationPrevious, this.rotation, time));

        this.sprite.draw(context, -this.radius, -this.radius);

        context.restore();
    }
}