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
    static FLOOR = 30;
    static FURNACE_WIDTH = 120;

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
        this.boilerWidth = this.width * .5 - Locomotive.FURNACE_WIDTH * .5;

        const parts = [
            // Floor
            Matter.Bodies.rectangle(
                bodyPosition.x,
                bodyPosition.y + height * .5 - Locomotive.FLOOR * .5,
                width,
                Locomotive.FLOOR),
            // Boiler
            Matter.Bodies.rectangle(
                bodyPosition.x + width * .5 - this.boilerWidth * .5,
                bodyPosition.y - Locomotive.FLOOR * .5,
                this.boilerWidth,
                height - Locomotive.FLOOR),
            // Cabin
            Matter.Bodies.rectangle(
                bodyPosition.x - width * .5 + this.boilerWidth * .5,
                bodyPosition.y - Locomotive.FLOOR * .5,
                this.boilerWidth,
                height - Locomotive.FLOOR),
        ];

        this.body = Matter.Body.create({
            parts: parts
        });

        this.centerShift = new Vector(
            this.body.position.x - bodyPosition.x,
            this.body.position.y - bodyPosition.y);

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
        context.translate(this.width * -.5 - this.centerShift.x, this.height * -.5 - this.centerShift.y);

        context.fillStyle = "#fff";
        context.beginPath();
        context.rect(0, this.height - Locomotive.FLOOR, this.width, Locomotive.FLOOR);
        context.rect(this.width - this.boilerWidth, 0, this.boilerWidth, this.height - Locomotive.FLOOR);
        context.rect(0, 0, this.boilerWidth, this.height - Locomotive.FLOOR);
        context.fill();

        context.restore();

        this.wheelDriveLeft.render(context, time);
        this.wheelDriveRight.render(context, time);
        this.wheelSmallLeft.render(context, time);
        this.wheelSmallRight.render(context, time);
    }
}