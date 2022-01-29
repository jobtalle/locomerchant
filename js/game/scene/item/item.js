import {Utils} from "../../../math/utils.js";
import {Sounds} from "../../audio/sounds.js";

export class Item {
    static BURN_RATE = .003;
    static BURN_RATE_EXTRA = .015;

    constructor(engine, position, sprites, width, height, fuel = 15, fuelDensity = 1, shape = "rectangle") {
        this.engine = engine;
        this.width = width;
        this.sprites = sprites;
        this.height = height;
        this.fuel = fuel;
        this.fuelInitial = fuel;
        this.fuelDensity = fuelDensity;
        this.burning = false;
        this.burnable = fuel !== 0;
        this.locomotive = null;

        switch (shape) {
            case "circle":
                this.body = Matter.Bodies.circle(position.x, position.y, (width + height) * .25, {
                    collisionFilter: {
                        category: 2
                    }
                });

                break;
            case "rectangle":
                this.body = Matter.Bodies.rectangle(position.x, position.y, width, height, {
                    collisionFilter: {
                        category: 2
                    }
                });

                break;
        }

        Matter.Composite.add(engine.world, [this.body]);
    }

    enterFurnace(locomotive) {
        this.locomotive = locomotive;

        if (this.burnable)
            Sounds.BURN.play();

        locomotive.furnaceItems.push(this);
    }

    leaveFurnace() {
        this.locomotive.furnaceItems.splice(this.locomotive.furnaceItems.indexOf(this), 1);
        this.locomotive = null;
    }

    update() {
        if (this.burning) {
            if ((this.fuel -= Item.BURN_RATE) < 0)
                return true;
        }

        return false;
    }

    burn(rate) {
        this.fuel -= Item.BURN_RATE_EXTRA * rate;
    }

    render(context, time) {
        context.save();
        context.translate(
            Utils.lerp(this.body.positionPrev.x, this.body.position.x, time),
            Utils.lerp(this.body.positionPrev.y, this.body.position.y, time));
        context.rotate(Utils.lerp(this.body.anglePrev, this.body.angle, time));

        context.fillStyle = this.burning ? "#f00" : "#9a4d4d";

        let sprite = this.sprites[0];

        if (this.burning)
            sprite = this.sprites[1 + Math.floor((1 - this.fuel / this.fuelInitial) * (this.sprites.length - 1))];

        sprite.draw(context, this.width * -.5, this.height * -.5);

        context.restore();
    }

    destroy() {
        if (this.locomotive)
            this.leaveFurnace(this.locomotive);

        Matter.World.remove(this.engine.world, [this.body]);
    }
}