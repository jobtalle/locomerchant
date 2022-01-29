import {Layer} from "./layer.js";
import {Utils} from "../../../../math/utils.js";

export class LayerSpawner {
    constructor(sprite, width, height, depth, intervalMin = width - 1, intervalMax = intervalMin) {
        this.intervalMin = intervalMin;
        this.intervalMax = intervalMax;
        this.countdown = this.makeInterval();
        this.sprites = Array.isArray(sprite) ? sprite : [sprite];
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    makeInterval() {
        return Utils.lerp(this.intervalMin, this.intervalMax, Math.random());
    }

    move(delta, x, height) {
        this.countdown -= delta;

        if (this.countdown < 0) {
            const shift = this.countdown;
            const sprite = this.sprites[Math.floor(Math.random() * this.sprites.length)];

            this.countdown += this.makeInterval();

            return [new Layer(x + shift, height - this.height, this.width, this.height, sprite, this.depth)];
        }

        return [];
    }
}