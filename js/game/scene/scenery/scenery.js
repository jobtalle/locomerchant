import {Scene} from "../scene.js";

export class Scenery {
    static INITIALIZE_DELTA = 50;

    constructor(width, height, spawners) {
        this.width = width;
        this.height = height;
        this.spawners = spawners;
        this.layersBack = [];
        this.layersFront = [];
    }

    initialize() {
        const moves = 500;

        for (let move = 0; move < moves; ++move)
            this.move(Scenery.INITIALIZE_DELTA);
    }

    move(delta) {
        for (const layer of this.layersBack)
            layer.move(delta);

        for (const layer of this.layersFront)
            layer.move(delta);

        const newLayers = [];

        for (const spawner of this.spawners)
            newLayers.push(...spawner.move(delta, this.width, this.height));

        if (newLayers.length > 0) {
            for (const layer of newLayers) {
                if (layer.depth >= 0)
                    this.layersBack.push(layer);
                else
                    this.layersFront.push(layer);
            }

            this.layersBack.sort((a, b) => a.depth - b.depth);
            this.layersFront.sort((a, b) => a.depth - b.depth);
        }
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