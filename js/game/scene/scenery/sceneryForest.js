import {Scenery} from "./scenery.js";
import {LayerSpawner} from "./layer/layerSpawner.js";

export class SceneryForest extends Scenery {
    constructor(width, height) {
        super(width, height, [
            new LayerSpawner(null, .3),
            new LayerSpawner(null, .6),
            new LayerSpawner(null, 1),

            new LayerSpawner(null, -.3),
            new LayerSpawner(null, -.6),
            new LayerSpawner(null, -1)
        ]);
    }
}