import {Sprites} from "../sprite/sprites.js";
import {Utils} from "../../math/utils.js";
import {Vector} from "../../math/vector.js";

export class Seller {
    constructor(engine, position, buying) {
        this.engine = engine;
        this.buying = buying;
        this.body = Matter.Bodies.rectangle(position.x, position.y, 574, 46, {
            collisionFilter: {
                category: 2
            },
            isStatic: true
        });

        this.items = [];
        this.price = 0;

        Matter.Composite.add(engine.world, [this.body]);
    }

    getPrice(item) {
        for (const buying of this.buying)
            if (item instanceof buying.f)
                return buying.price;

        return 0;
    }

    updatePrice() {
        this.price = 0;

        for (const item of this.items) {
            this.price += this.getPrice(item);
        }

        console.log(this.price);
    }

    addItem(item) {
        this.items.push(item);

        this.updatePrice();
    }

    removeItem(item) {
        const index = this.items.indexOf(item);

        if (index !== -1)
            this.items.splice(index, 1);

        this.updatePrice();
    }

    update() {

    }

    move(delta) {
        const xp = this.body.position.x;

        Matter.Body.setPosition(this.body, new Vector(this.body.position.x - delta, this.body.position.y));
        this.body.positionPrev.x = xp;
    }

    render(context, time) {
        context.save();
        context.translate(
            Utils.lerp(this.body.positionPrev.x, this.body.position.x, time),
            Utils.lerp(this.body.positionPrev.y, this.body.position.y, time));
        context.rotate(Utils.lerp(this.body.anglePrev, this.body.angle, time));

        Sprites.SCALE_PLATE.draw(context, -574 * .5, -46 * .7);

        context.restore();
    }

    destroy() {
        Matter.World.remove(this.engine.world, [this.body]);
    }
}