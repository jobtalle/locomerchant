import {Vector} from "../../../math/vector.js";
import {Wagon} from "./wagon.js";
import {Utils} from "../../../math/utils.js";
import {Wheel} from "./wheel.js";

export class Locomotive {
    static WHEEL_RADIUS_DRIVE = Wagon.WHEEL_RADIUS * 1.2;
    static WHEEL_RADIUS_SMALL = Locomotive.WHEEL_RADIUS_DRIVE * .5;
    static SUSPENSION_HEIGHT = Wagon.SUSPENSION_HEIGHT;
    static SUSPENSION_STIFFNESS = .01;
    static SUSPENSION_DAMPING = .1;
    static BOILER_WIDTH = 300;
    static BOILER_HEIGHT = 200;

    constructor(engine, position, width, height) {
        const bodyPosition = new Vector(
            position.x - width * .5,
            position.y - height * .5 - Locomotive.WHEEL_RADIUS_DRIVE - Locomotive.SUSPENSION_HEIGHT);

        this.width = width;
        this.height = height;
        this.wheelDriveLeft = new Wheel(
            new Vector(position.x - width + Locomotive.WHEEL_RADIUS_DRIVE, position.y - Locomotive.WHEEL_RADIUS_DRIVE),
            Locomotive.WHEEL_RADIUS_DRIVE);
        this.wheelDriveRight = new Wheel(
            new Vector(position.x - width + 4 * Locomotive.WHEEL_RADIUS_DRIVE, position.y - Locomotive.WHEEL_RADIUS_DRIVE),
            Locomotive.WHEEL_RADIUS_DRIVE);
        this.wheelSmallLeft = new Wheel(
            new Vector(position.x - 4 * Locomotive.WHEEL_RADIUS_SMALL, position.y - Locomotive.WHEEL_RADIUS_SMALL),
            Locomotive.WHEEL_RADIUS_SMALL);
        this.wheelSmallRight = new Wheel(
            new Vector(position.x - Locomotive.WHEEL_RADIUS_SMALL, position.y - Locomotive.WHEEL_RADIUS_SMALL),
            Locomotive.WHEEL_RADIUS_SMALL);

        const floor = Matter.Bodies.rectangle(
            bodyPosition.x,
            bodyPosition.y,
            width,
            height);
        const boiler = Matter.Bodies.rectangle(
            position.x + width - Locomotive.BOILER_WIDTH * .5,
            position.y + height - Locomotive.BOILER_HEIGHT * .5,
            Locomotive.BOILER_WIDTH,
            Locomotive.BOILER_HEIGHT);

        this.body = Matter.Body.create({
            parts: [floor]
        });

        this.bodySpringLeft = Matter.Constraint.create({
            pointA: new Vector(
                bodyPosition.x - width * .5,
                bodyPosition.y - height * .5 - Wagon.SPRING_HEIGHT),
            pointB: new Vector(
                width * -.5 * Wagon.SPRING_CENTER,
                height * -.5),
            bodyB: this.body,
            stiffness: Locomotive.SUSPENSION_STIFFNESS,
            damping: Locomotive.SUSPENSION_DAMPING
        });
        this.bodySpringRight = Matter.Constraint.create({
            pointA: new Vector(
                bodyPosition.x + width * .5,
                bodyPosition.y - height * .5 - Wagon.SPRING_HEIGHT),
            pointB: new Vector(
                width * .5 * Wagon.SPRING_CENTER,
                height * -.5),
            bodyB: this.body,
            stiffness: Locomotive.SUSPENSION_STIFFNESS,
            damping: Locomotive.SUSPENSION_DAMPING
        });

        Matter.Composite.add(engine.world, [this.body, this.bodySpringLeft, this.bodySpringRight]);
    }

    update() {
        this.wheelDriveLeft.update();
        this.wheelDriveRight.update();
        this.wheelSmallLeft.update();
        this.wheelSmallRight.update();
    }

    render(context, time) {
        context.save();
        context.translate(
            Utils.lerp(this.body.positionPrev.x, this.body.position.x, time),
            Utils.lerp(this.body.positionPrev.y, this.body.position.y, time));
        context.rotate(Utils.lerp(this.body.anglePrev, this.body.angle, time));
        context.translate(this.width * -.5, this.height * -.5);

        context.fillStyle = "#fff";
        context.beginPath();
        context.rect(0, 0, this.width, this.height);
        context.fill();

        context.restore();

        this.wheelDriveLeft.render(context, time);
        this.wheelDriveRight.render(context, time);
        this.wheelSmallLeft.render(context, time);
        this.wheelSmallRight.render(context, time);
    }
}