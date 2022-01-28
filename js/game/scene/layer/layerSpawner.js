import {Layer} from "./layer.js";

export class LayerSpawner {
    constructor() {
        this.interval = 1000;
        this.countdown = 0;
    }

    move(delta, x, height) {
        if ((this.countdown -= delta) < 0) {
            this.countdown += this.interval;

            return [new Layer(x, height - 700, 400, 700)];
        }

        return [];
    }
}