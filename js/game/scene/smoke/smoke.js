import {SmokePoint} from "./smokePoint.js";
import {Vector} from "../../../math/vector.js";

export class Smoke {
    static FREQUENCY = 10;
    static MAX_POINTS = 50;

    constructor(origin) {
        this.origin = origin;
        this.countdown = 1;
        this.points = [];
    }

    update() {
        if (--this.countdown === 0) {
            this.countdown = Smoke.FREQUENCY;

            this.points.push(
                new SmokePoint(this.origin.copy(), new Vector(-Math.random() - .3, -2)),
                new SmokePoint(this.origin.copy(), new Vector(Math.random() + .3, -2)));

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

        context.fillStyle = "#fff";
        context.beginPath();

        for (let step = 0; step < steps; ++step) {
            context.lineTo(
                this.points[step * 2].getX(time),
                this.points[step * 2].getY(time));
        }

        for (let step = steps; step-- > 0;) {
            context.lineTo(
                this.points[1 + step * 2].getX(time),
                this.points[1 + step * 2].getY(time));
        }

        context.closePath();
        context.fill();
    }
}