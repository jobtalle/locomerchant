import {Scenery} from "./scenery.js";
import {LayerSpawner} from "./layer/layerSpawner.js";
import {Sprites} from "../../sprite/sprites.js";

export class SceneryForest extends Scenery {
    constructor(width, height) {
        super(
            width,
            height,
            Sprites.BIOME_EYVIND_BACKGROUND,
            [
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_B1,
                    1700,
                    444,
                    .8),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_B2_A,
                    537,
                    1080,
                    .3,
                    6000,
                    10000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_B2_B,
                    638,
                    1080,
                    .4,
                    6000,
                    10000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_B2_C,
                    407,
                    1080,
                    .2,
                    6000,
                    10000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_B3_A,
                    193,
                    1080,
                    .09,
                    10000,
                    15000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_B3_B,
                    204,
                    1080,
                    .1,
                    10000,
                    15000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_B3_C,
                    233,
                    1080,
                    .11,
                    10000,
                    15000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_B3_D,
                    144,
                    1080,
                    .12,
                    10000,
                    15000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_GROUND,
                    1606,
                    230,
                    1),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_F1_A,
                    119,
                    151,
                    -.01,
                    200, 1000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_F1_C,
                    118,
                    186,
                    -.008,
                    200, 1000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_F1_E,
                    96,
                    184,
                    -.007,
                    200, 1000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_F1_B,
                    57,
                    192,
                    -.005,
                    200, 1000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_F1_D,
                    108,
                    150,
                    -.01,
                    200, 1000),
                new LayerSpawner(
                    Sprites.BIOME_EYVIND_LAYER_F1_F,
                    126,
                    128,
                    -.02,
                    200, 1000),
        ]);
    }
}