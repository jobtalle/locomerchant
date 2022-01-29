import {SmokePoint} from "./smokePoint.js";
import {Vector} from "../../../math/vector.js";

export class Smoke {
    static FREQUENCY = 7;
    static MAX_POINTS = 50;

    constructor(origin) {
        this.origin = origin;
        this.countdown = 1;
        this.points = [];
    }

    move(delta) {
        for (const point of this.points) {
            // point.position.x -= delta * .25;
            // point.position.y -= delta * .15;
        }
    }

    initialize() {
        for (let i = 0; i < 200; ++i)
            this.update(0, 0);
    }

    update(heat, velocity) {
        if (--this.countdown === 0) {
            this.countdown = Smoke.FREQUENCY;

            const up = -Math.max(velocity * .35, 4);
            const angle = Math.atan2(velocity, up) - Math.PI * .5;
            const side = heat * .25;
            const sl = side * Math.pow(Math.random(), .96);
            const sr = side * Math.pow(Math.random(), .96);

            this.points.push(
                new SmokePoint(this.origin.copy(),
                    new Vector(
                        Math.cos(angle) * up + Math.cos(angle + Math.PI * .5) * sl,
                        Math.sin(angle) * up + Math.sin(angle + Math.PI * .5) * sl)),
                new SmokePoint(this.origin.copy(),
                    new Vector(
                        Math.cos(angle) * up + Math.cos(angle - Math.PI * .5) * sr,
                        Math.sin(angle) * up + Math.sin(angle - Math.PI * .5) * sr)));

            if (this.points.length > Smoke.MAX_POINTS) {
                this.points.shift();
                this.points.shift();
            }
        }

        for (const point of this.points)
            point.update();
    }

    render(context, time) {
        const steps = this.points.length >> 1;
        const gradient = context.createRadialGradient(
            this.origin.x, this.origin.y, 0,
            this.origin.x, this.origin.y, 700);

        gradient.addColorStop(0, "rgba(255,255,255,0.76)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        context.fillStyle = gradient;
        context.beginPath();

        for (let step = steps; step-- > 0;) {
            context.lineTo(
                this.points[1 + step * 2].getX(time),
                this.points[1 + step * 2].getY(time));
        }

        for (let step = 0; step < steps; ++step) {
            context.lineTo(
                this.points[step * 2].getX(time),
                this.points[step * 2].getY(time));
        }

        context.lineTo(this.origin.x, this.origin.y);

        context.closePath();
        context.fill();
    }
}