import {Layer} from "./layer.js";

export class LayerSpawner {
    constructor() {
        this.interval = 1000 + 400 * Math.random();
        this.countdown = 500 * Math.random();
    }

    move(delta, x, height) {
        this.countdown -= delta;

        while (this.countdown < 0) {
            this.countdown += this.interval;

            const h = 150 + Math.random() * 300;

            return [new Layer(x, height - h, 400, h)];
        }

        return [];
    }
}