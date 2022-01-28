import {Utils} from "../../../math/utils.js";

export class Item {
    constructor(engine, position, width, height) {
        this.engine = engine;
        this.width = width;
        this.height = height;

        this.body = Matter.Bodies.rectangle(position.x, position.y, width, height, {
            collisionFilter: {
                category: 2
            }
        });

        Matter.Composite.add(engine.world, [this.body]);
    }

    update() {

    }

    render(context, time) {
        context.save();
        context.translate(
            Utils.lerp(this.body.positionPrev.x, this.body.position.x, time),
            Utils.lerp(this.body.positionPrev.y, this.body.position.y, time));
        context.rotate(Utils.lerp(this.body.anglePrev, this.body.angle, time));
        context.translate(this.width * -.5, this.height * -.5);

        context.fillStyle = "#9a4d4d";
        context.beginPath();
        context.rect(0, 0, this.width, this.height);
        context.fill();

        context.restore();
    }

    destroy() {
        Matter.World.remove(this.engine.world, [this.body]);
    }
}