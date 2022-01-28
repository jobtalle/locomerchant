import {Utils} from "../../../math/utils.js";

export class Wheel {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
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

        context.fillStyle = "#7288b4";
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2);
        context.fill();

        context.strokeStyle = "#1f6a98";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(-this.radius * .9, 0);
        context.lineTo(this.radius * .9, 0);
        context.stroke();

        context.restore();
    }
}