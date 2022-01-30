import {Vector} from "../../../math/vector.js";
import {Wagon} from "./wagon.js";
import {Utils} from "../../../math/utils.js";
import {Wheel} from "./wheel.js";
import {Sprites} from "../../sprite/sprites.js";
import {Sounds} from "../../audio/sounds.js";
import {Smoke} from "../smoke/smoke.js";

export class Locomotive {
    static WHEEL_RADIUS_DRIVE = 70.5;
    static WHEEL_RADIUS_SMALL = 36.5;
    static SUSPENSION_HEIGHT = Wagon.SUSPENSION_HEIGHT;
    static SUSPENSION_STIFFNESS = .01;
    static SUSPENSION_DAMPING = .07;
    static FLOOR = 50;
    static FURNACE_WIDTH = 120;
    static LEVER_X = 100;
    static HEAT_MAX = 25;
    static TRACK_SPACING = 1200;
    static HEAT_INITIAL = 10;

    constructor(engine, position, width, height) {
        const bodyPosition = new Vector(
            position.x - width * .5,
            position.y - height * .5 - Locomotive.WHEEL_RADIUS_DRIVE - Locomotive.SUSPENSION_HEIGHT);

        this.width = width;
        this.height = height;
        this.track = Locomotive.TRACK_SPACING;
        this.wheelDriveLeft = new Wheel(
            new Vector(position.x - width + 1.5 * Locomotive.WHEEL_RADIUS_DRIVE, position.y - Locomotive.WHEEL_RADIUS_DRIVE),
            Locomotive.WHEEL_RADIUS_DRIVE,
            Sprites.LOCOMOTIVE_WHEEL_BIG,
            0);
        this.wheelDriveRight = new Wheel(
            new Vector(position.x - width + 4 * Locomotive.WHEEL_RADIUS_DRIVE, position.y - Locomotive.WHEEL_RADIUS_DRIVE),
            Locomotive.WHEEL_RADIUS_DRIVE,
            Sprites.LOCOMOTIVE_WHEEL_BIG,
            0);
        this.wheelSmallLeft = new Wheel(
            new Vector(position.x - 5.5 * Locomotive.WHEEL_RADIUS_SMALL, position.y - Locomotive.WHEEL_RADIUS_SMALL),
            Locomotive.WHEEL_RADIUS_SMALL,
            Sprites.LOCOMOTIVE_WHEEL_SMALL);
        this.wheelSmallRight = new Wheel(
            new Vector(position.x - 3.2 * Locomotive.WHEEL_RADIUS_SMALL, position.y - Locomotive.WHEEL_RADIUS_SMALL),
            Locomotive.WHEEL_RADIUS_SMALL,
            Sprites.LOCOMOTIVE_WHEEL_SMALL);
        this.boilerWidth = this.width * .5 - Locomotive.FURNACE_WIDTH * .5;
        this.leverAngle = Math.PI * -.5;
        this.leverAnglePrevious = this.leverAngle;
        this.leverAngleTarget = this.leverAngle;
        this.leverPosition = new Vector(Locomotive.LEVER_X, this.height - Locomotive.FLOOR);
        this.furnaceItems = [];
        this.heat = Locomotive.HEAT_INITIAL;
        this.heatPrevious = this.heat;
        this.heatTarget = this.heat;
        this.velocity = 0;
        this.brakePrevious = 0;
        this.beamDerivative = 0;
        this.smoke = new Smoke(new Vector(
            this.wheelSmallLeft.position.x + 28,
            this.wheelSmallLeft.position.y - 430));
        this.headAngle = 0;
        this.headAnglePrevious = 0;
        this.headAngleSpeed = 0;

        const parts = [
            this.furnace = Matter.Bodies.rectangle(
                bodyPosition.x,
                bodyPosition.y,
                Locomotive.FURNACE_WIDTH,
                height,
                {
                    isSensor: true
                }),
            // Floor
            Matter.Bodies.rectangle(
                bodyPosition.x,
                bodyPosition.y + height * .5 - Locomotive.FLOOR * .5,
                width,
                Locomotive.FLOOR),
            // Boiler
            Matter.Bodies.rectangle(
                bodyPosition.x + width * .5 - this.boilerWidth * .5,
                bodyPosition.y,
                this.boilerWidth,
                height),
            // Cabin
            this.cabin = Matter.Bodies.rectangle(
                bodyPosition.x - width * .5 + this.boilerWidth * .5,
                bodyPosition.y,
                this.boilerWidth,
                height),
        ];

        this.body = Matter.Body.create({
            parts: parts,
            collisionFilter: {
                group: -1
            }
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

        this.initialize();
    }

    initialize() {
        this.smoke.initialize();
    }

    reset() {
        this.furnaceItems = [];
        this.velocity = 0;
        this.heat = Locomotive.HEAT_INITIAL;
        this.leverAngle = this.leverAngleTarget = Math.PI * -.5;

        Sounds.WHEELS_ACCELERATE.stop();
        Sounds.WHEELS_BRAKE.stop();
    }

    accelerate(delta) {
        this.headAngleSpeed *= .9;
        this.headAngleSpeed -= this.headAngle * .05;
        this.headAngleSpeed -= delta * .025;
    }

    furnaceBurning() {
        for (const item of this.furnaceItems) if (item.burning)
            return true;

        return false;
    }

    pullLever(position) {
        const c = Math.cos(this.body.angle);
        const s = Math.sin(this.body.angle);
        const lpx = this.body.position.x - c * this.width * .5 + s * this.height * .5 + c * this.leverPosition.x - s * this.leverPosition.y;
        const lpy = this.body.position.y - s * this.width * .5 - c * this.height * .5 + s * this.leverPosition.x + c * this.leverPosition.y;

        let angle = Math.atan2(position.y - lpy, position.x - lpx);

        if (angle > 0 && angle < Math.PI * .5)
            angle = 0;

        if (angle >= Math.PI * .5 || angle < Math.PI * -.75)
            angle = Math.PI * -.75;

        this.leverAngleTarget = angle;
    }

    updateVelocity() {
        const friction = .998;
        const brakeStrength = .005;
        const brakeBase = .04;
        const accelerate = 1 - Math.min(1, -this.leverAngle / (Math.PI * .5));
        const brake = Math.max(0, (-this.leverAngle - Math.PI * .5) / (Math.PI * .25) - .1) / .9;
        const velocityPrevious = this.velocity;

        this.velocity *= friction;
        this.velocity += Math.pow(this.heat, .7) * .02 * accelerate;
        this.velocity = Math.max(0, this.velocity - (this.velocity * brakeStrength + brakeBase) * brake * brake);

        if (this.velocity === 0 && velocityPrevious !== 0) {
            Sounds.TRAIN_STOP.play();
            Sounds.WHEELS_ACCELERATE.stop();
            Sounds.WHEELS_BRAKE.stop();
        }

        if (this.velocity > 0) {
            if (velocityPrevious === 0) {
                Sounds.WHEELS_ACCELERATE.play();
                Sounds.TRAIN_STOP.play();
            }

            Sounds.WHEELS_ACCELERATE.setVolume(Math.min(1, this.velocity / 15));
        }

        if (brake > 0 && this.velocity > 0) {
            if (this.brakePrevious === 0)
                Sounds.WHEELS_BRAKE.play();

            Sounds.WHEELS_BRAKE.setVolume(Math.min(1, this.velocity / 15) * brake * brake);
        }
        else
            Sounds.WHEELS_BRAKE.stop();

        for (const item of this.furnaceItems) if (item.burning) item.burn(accelerate);

        this.brakePrevious = brake;
    }

    move(delta) {
        this.wheelDriveLeft.move(delta);
        this.wheelDriveRight.move(delta);
        this.wheelSmallLeft.move(delta);
        this.wheelSmallRight.move(delta);
        this.smoke.move(delta);
    }

    update() {
        this.headAnglePrevious = this.headAngle;
        this.headAngle += this.headAngleSpeed;

        this.wheelDriveLeft.update();
        this.wheelDriveRight.update();
        this.wheelSmallLeft.update();
        this.wheelSmallRight.update();
        this.smoke.update(this.heat, this.velocity);

        this.leverAnglePrevious = this.leverAngle;
        this.leverAngle += (this.leverAngleTarget - this.leverAngle) * .7;

        this.heatPrevious = this.heat;
        this.heat += (this.heatTarget - this.heat) * .002;

        const burning = this.furnaceBurning();
        this.heatTarget = 0;

        for (const item of this.furnaceItems) {
            const burningPrevious = item.burning;

            item.burning = item.burnable && burning;

            if (item.burning !== burningPrevious)
                Sounds.BURN.play();

            if (burning)
                this.heatTarget += item.body.mass * item.fuelDensity;
        }

        if ((this.track -= this.velocity) < 0) {
            this.track += Locomotive.TRACK_SPACING;

            Sounds.TRACK_TRANSITION.play();
        }

        this.updateVelocity();
    }

    renderBackground(context, time) {
        context.save();
        context.translate(
            Utils.lerp(this.body.positionPrev.x, this.body.position.x, time),
            Utils.lerp(this.body.positionPrev.y, this.body.position.y, time));
        context.rotate(Utils.lerp(this.body.anglePrev, this.body.angle, time));
        context.translate(this.width * -.5 - this.centerShift.x, this.height * -.5 - this.centerShift.y);

        const heatGradient = context.createLinearGradient(0, 380 - 225, 0, 250 - 225);
        const heat = Math.min(1, Utils.lerp(this.heatPrevious, this.heat, time) / Locomotive.HEAT_MAX);

        heatGradient.addColorStop(0, "hsl(50, " + (heat * 80) + "%, 50%)");
        heatGradient.addColorStop(heat, "hsl(0, " + (Math.pow(heat, .3) * 80) + "%, 50%)");
        heatGradient.addColorStop(1, "#313131");

        context.fillStyle = heatGradient;
        context.beginPath();
        context.rect(290, 250 - 225, 300, 380 - 225);
        context.fill();

        context.restore();
    }

    render(context, time) {
        this.smoke.render(context, time);

        context.save();
        context.translate(
            Utils.lerp(this.body.positionPrev.x, this.body.position.x, time),
            Utils.lerp(this.body.positionPrev.y, this.body.position.y, time));
        context.rotate(Utils.lerp(this.body.anglePrev, this.body.angle, time));
        context.translate(this.width * -.5 - this.centerShift.x, this.height * -.5 - this.centerShift.y);

        Sprites.LOCOMOTIVE.draw(context, -10, -225);

        context.save();
        context.translate(this.leverPosition.x, this.leverPosition.y);
        context.rotate(Utils.lerp(this.leverAnglePrevious, this.leverAngle, time) + Math.PI * .5);

        Sprites.LOCOMOTIVE_LEVER_2.draw(context, -26, -126);

        context.restore();

        Sprites.LOCOMOTIVE_LEVER_1.draw(context, this.leverPosition.x - 50, this.leverPosition.y - 45);

        context.save();
        context.translate(30, 0);
        context.rotate(Utils.lerp(this.headAnglePrevious, this.headAngle, time));

        Sprites.LOCOMOTIVE_HEAD.draw(context, -33, -58);

        context.restore();

        context.restore();

        this.wheelDriveLeft.render(context, time);
        this.wheelDriveRight.render(context, time);
        this.wheelSmallLeft.render(context, time);
        this.wheelSmallRight.render(context, time);

        const beamRadius = 30;
        const beamRotation = Utils.lerp(this.wheelDriveLeft.rotationPrevious, this.wheelDriveLeft.rotation, time);
        const beamLength = 176;
        const beamX = this.wheelDriveLeft.position.x + Math.sin(beamRotation) * beamRadius;
        const beamY = this.wheelDriveLeft.position.y - Math.cos(beamRotation) * beamRadius;
        const h = Math.cos(beamRotation) * beamRadius;
        const beam2Length = 110;
        const beam2Angle = Math.asin(h / beam2Length);
        const beamDerivativePrevious = this.beamDerivative;

        this.beamDerivative = Math.cos(beamRotation);

        if (Math.sign(beamDerivativePrevious) === 1 && Math.sign(this.beamDerivative) === -1)
            Sounds.ENGINE_PUFF.play();

        Sprites.LOCOMOTIVE_BEAM.draw(context, beamX - 13, beamY - 11);

        context.save();
        context.translate(beamX + beamLength, beamY);
        context.rotate(beam2Angle);

        Sprites.LOCOMOTIVE_BEAM_2.draw(
            context, -15, -16);

        context.restore();

        Sprites.LOCOMOTIVE_BEAM_3.draw(
            context,
            beamX + beamLength + Math.cos(beam2Angle) * beam2Length - 14,
            beamY + Math.sin(beam2Angle) * beam2Length - 14);
        Sprites.LOCOMOTIVE_CYLINDER.draw(
            context,
            this.wheelSmallRight.position.x - 120,
            this.wheelDriveLeft.position.y - 38);
    }
}