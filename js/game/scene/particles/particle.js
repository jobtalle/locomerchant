import {Utils} from "../../../math/utils.js";

export class Particle {
    constructor(position, velocity, radius, color, alpha, decay) {
        this.position = position;
        this.positionPrevious = position.copy();
        this.velocity = velocity;
        this.radius = radius;
        this.color = color;
        this.alpha = alpha;
        this.decay = decay;
        this.intensity = 1;
        this.intensityPrevious = this.intensity;
    }

    update() {
        this.intensityPrevious = this.intensity;
        this.positionPrevious.set(this.position);

        this.position.add(this.velocity);

        if ((this.intensity -= this.decay) < 0)
            return true;

        return false;
    }

    render(context, time) {
        const intensity =  Utils.lerp(this.intensityPrevious, this.intensity, time);

        context.globalAlpha = this.alpha * intensity;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(
            Utils.lerp(this.positionPrevious.x, this.position.x, time),
            Utils.lerp(this.positionPrevious.y, this.position.y, time),
            this.radius * Math.sin(Math.PI * Math.sqrt(intensity)),
            0,
            Math.PI * 2);
        context.fill();
    }
}