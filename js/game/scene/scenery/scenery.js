import {LayerSpawner} from "./layer/layerSpawner.js";
import {Scene} from "../scene.js";

export class Scenery {
    static INITIALIZE_DELTA = 50;

    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.layerSpawnerBack = new LayerSpawner();
        this.layerSpawnerFront = new LayerSpawner();
        this.layersBack = [];
        this.layersFront = [];
    }

    initialize() {
        const moves = (this.width + Scene.DESTROY_LEFT) / Scenery.INITIALIZE_DELTA;

        for (let move = 0; move < moves; ++move)
            this.move(Scenery.INITIALIZE_DELTA);
    }

    move(delta) {
        this.layersBack.push(...this.layerSpawnerBack.move(delta, this.width, this.height));
        this.layersFront.push(...this.layerSpawnerFront.move(delta, this.width, this.height));

        for (const layer of this.layersBack)
            layer.move(delta);

        for (const layer of this.layersFront)
            layer.move(delta);
    }

    update() {
        for (let layer = this.layersBack.length; layer-- > 0;) {
            if (this.layersBack[layer].x + this.layersBack[layer].width < -Scene.DESTROY_LEFT)
                this.layersBack.splice(layer, 1);
            else
                this.layersBack[layer].update();
        }

        for (let layer = this.layersFront.length; layer-- > 0;) {
            if (this.layersFront[layer].x + this.layersFront[layer].width < -Scene.DESTROY_LEFT)
                this.layersFront.splice(layer, 1);
            else
                this.layersFront[layer].update();
        }
    }

    renderBackground(context, time) {
        for (let layer = 0, layerCount = this.layersBack.length; layer < layerCount; ++layer)
            this.layersBack[layer].render(context, time);
    }

    renderForeground(context, time) {
        for (let layer = 0, layerCount = this.layersFront.length; layer < layerCount; ++layer)
            this.layersFront[layer].render(context, time);
    }
}