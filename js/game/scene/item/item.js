import {Utils} from "../../../math/utils.js";

export class Item {
    static BURN_RATE = .01;

    constructor(engine, position, width, height, fuel = 2, fuelDensity = 1) {
        this.engine = engine;
        this.width = width;
        this.height = height;
        this.fuel = fuel;
        this.fuelDensity = fuelDensity;
        this.burning = Math.random() < .5;
        this.locomotive = null;

        this.body = Matter.Bodies.rectangle(position.x, position.y, width, height, {
            collisionFilter: {
                category: 2
            }
        });

        Matter.Composite.add(engine.world, [this.body]);
    }

    enterFurnace(locomotive) {
        this.locomotive = locomotive;

        locomotive.furnaceItems.push(this);
    }

    leaveFurnace() {
        this.locomotive.furnaceItems.splice(this.locomotive.furnaceItems.indexOf(this), 1);
        this.locomotive = null;
        this.burning = false;
    }

    update() {
        if (this.burning) {
            if ((this.fuel -= Item.BURN_RATE) < 0)
                return true;
        }

        return false;
    }

    render(context, time) {
        context.save();
        context.translate(
            Utils.lerp(this.body.positionPrev.x, this.body.position.x, time),
            Utils.lerp(this.body.positionPrev.y, this.body.position.y, time));
        context.rotate(Utils.lerp(this.body.anglePrev, this.body.angle, time));
        context.translate(this.width * -.5, this.height * -.5);

        context.fillStyle = this.burning ? "#f00" : "#9a4d4d";
        context.beginPath();
        context.rect(0, 0, this.width, this.height);
        context.fill();

        context.restore();
    }

    destroy() {
        if (this.locomotive)
            this.leaveFurnace(this.locomotive);

        Matter.World.remove(this.engine.world, [this.body]);
    }
}