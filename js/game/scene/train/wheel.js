export class Wheel {
    constructor(position, radius) {
        this.position = position;
        this.radius = radius;
        this.rotation = Math.random() * Math.PI * 2;
    }

    update() {

    }

    render(context, time) {
        context.fillStyle = "#7288b4";
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        context.fill();
    }
}