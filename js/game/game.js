import {Scene} from "./scene/scene.js";
import {Transform} from "../math/transform.js";
import {Vector} from "../math/vector.js";

export class Game {
    static WIDTH = 1920;
    static HEIGHT = 1080;

    constructor(mouse) {
        this.mouse = mouse;
        this.scene = new Scene(mouse, Game.WIDTH, Game.HEIGHT);
        this.transform = null;
    }

    resize(width, height) {
        const scale = height / Game.HEIGHT;

        this.transform = new Transform(
            new Vector(width - Game.WIDTH * scale, 0),
            new Vector(scale));

        Matter.Mouse.setOffset(this.mouse, new Vector(
            -this.transform.translate.x / this.transform.scale.x,
            -this.transform.translate.y / this.transform.scale.y));
        Matter.Mouse.setScale(this.mouse, new Vector(
            1 / this.transform.scale.x,
            1 / this.transform.scale.y));
    }

    update(delta) {
        this.scene.update(delta);
    }

    render(context, time) {
        context.save();

        this.transform.apply(context);

        this.scene.render(context, time);

        context.restore();
    }
}