import {Layer} from "./layer.js";

export class LayerSpawner {
    constructor(sprite, depth) {
        this.interval = 1000 + 400 * Math.random();
        this.countdown = 500 * Math.random();
        this.sprite = sprite;
        this.depth = depth;
    }

    move(delta, x, height) {
        this.countdown -= delta;

        while (this.countdown < 0) {
            this.countdown += this.interval;

            const h = 150 + Math.random() * 300;

            return [new Layer(x, height - h, 400, h, this.sprite, this.depth)];
        }

        return [];
    }
}