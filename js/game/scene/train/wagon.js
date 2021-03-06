import {Wheel} from "./wheel.js";
import {Vector} from "../../../math/vector.js";
import {Utils} from "../../../math/utils.js";
import {Sprites} from "../../sprite/sprites.js";

export class Wagon {
    static WHEEL_RADIUS = 59.5;
    static SPRING_HEIGHT = 100;
    static SPRING_CENTER = .7;
    static SUSPENSION_HEIGHT = 50;
    static SUSPENSION_STIFFNESS = .01;
    static SUSPENSION_DAMPING = .02;
    static WALL = 30;

    constructor(engine, position, width, height) {
        this.wheelRight = new Wheel(
            new Vector(position.x - Wagon.WHEEL_RADIUS, position.y - Wagon.WHEEL_RADIUS),
            Wagon.WHEEL_RADIUS,
            Sprites.WAGON_WHEEL);
        this.wheelLeft = new Wheel(
            new Vector(position.x - width + Wagon.WHEEL_RADIUS, position.y - Wagon.WHEEL_RADIUS),
            Wagon.WHEEL_RADIUS,
            Sprites.WAGON_WHEEL);
        this.width = width;
        this.height = height;

        const bodyPosition = new Vector(
            position.x - width * .5,
            position.y - height * .5 - Wagon.WHEEL_RADIUS - Wagon.SUSPENSION_HEIGHT);

        const parts =[
            // Floor
            Matter.Bodies.rectangle(
                bodyPosition.x,
                bodyPosition.y + height * .5 - Wagon.WALL * .5,
                width,
                Wagon.WALL),
            // Walls
            Matter.Bodies.rectangle(
                bodyPosition.x - width * .5 + Wagon.WALL * .5,
                bodyPosition.y,
                Wagon.WALL,
                height),
            Matter.Bodies.rectangle(
                bodyPosition.x + width * .5 - Wagon.WALL * .5,
                bodyPosition.y,
                Wagon.WALL,
                height)];

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
            stiffness: Wagon.SUSPENSION_STIFFNESS,
            damping: Wagon.SUSPENSION_DAMPING
        });
        this.bodySpringRight = Matter.Constraint.create({
            pointA: new Vector(
                bodyPosition.x + width * .5,
                bodyPosition.y - height * .5 - Wagon.SPRING_HEIGHT),
            pointB: new Vector(
                width * .5 * Wagon.SPRING_CENTER,
                height * -.5),
            bodyB: this.body,
            stiffness: Wagon.SUSPENSION_STIFFNESS,
            damping: Wagon.SUSPENSION_DAMPING
        });

        Matter.Composite.add(engine.world, [this.body, this.bodySpringLeft, this.bodySpringRight]);
    }

    move(delta) {
        this.wheelLeft.move(delta);
        this.wheelRight.move(delta);
    }

    update() {
        this.wheelLeft.update();
        this.wheelRight.update();
    }

    renderBackground(context, time) {
        context.save();
        context.translate(
            Utils.lerp(this.body.positionPrev.x, this.body.position.x, time),
            Utils.lerp(this.body.positionPrev.y, this.body.position.y, time));
        context.rotate(Utils.lerp(this.body.anglePrev, this.body.angle, time));
        context.translate(this.width * -.5 - this.centerShift.x, this.height * -.5 - this.centerShift.y);

        Sprites.WAGON_BACKBOARD.draw(context, 10, -5);

        context.restore();
    }

    render(context, time) {
        context.save();
        context.translate(
            Utils.lerp(this.body.positionPrev.x, this.body.position.x, time),
            Utils.lerp(this.body.positionPrev.y, this.body.position.y, time));
        context.rotate(Utils.lerp(this.body.anglePrev, this.body.angle, time));
        context.translate(this.width * -.5 - this.centerShift.x, this.height * -.5 - this.centerShift.y);

        Sprites.WAGON_CARRIAGE.draw(context, -22, -16);

        context.restore();

        this.wheelLeft.render(context, time);
        this.wheelRight.render(context, time);
    }
}