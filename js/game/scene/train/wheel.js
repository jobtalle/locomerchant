import {Utils} from "../../../math/utils.js";

export class Wheel {
    constructor(position, radius, sprite, rotation = Math.random() * Math.PI * 2) {
        this.position = position;
        this.radius = radius;
        this.sprite = sprite;
        this.rotation = rotation;
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

        const speed = Math.min(.999999, (this.rotation - this.rotationPrevious) / 1.2);

        this.sprite[Math.floor(this.sprite.length * speed)].draw(context, -this.radius, -this.radius);

        context.restore();
    }
}