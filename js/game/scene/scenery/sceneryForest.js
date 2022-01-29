import {Scenery} from "./scenery.js";
import {LayerSpawner} from "./layer/layerSpawner.js";
import {Sprites} from "../../sprite/sprites.js";

export class SceneryForest extends Scenery {
    constructor(width, height) {
        super(width, height, [
            new LayerSpawner(
                Sprites.BIOME_EYVIND_GROUND,
                1606,
                230,
                0)
        ]);
    }
}