import {Scenery} from "./scenery.js";
import {Sprites} from "../../sprite/sprites.js";
import {Catalogue} from "./catalogue/catalogue.js";
import {LayerSpawner} from "./layer/layerSpawner.js";

export class SceneryVillage extends Scenery {
    constructor(width, height, length) {
        super(
            width,
            height,
            length,
            Sprites.BIOME_VILLAGE_8_1,
            [
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_7_1,
                    1920,
                    179,
                    .1,
                    19000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_6_1,
                    775,
                    285,
                    .2,
                    5000,
                    15000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_6_2,
                    745,
                    256,
                    .25,
                    5000,
                    15000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_5_1,
                    383,
                    635,
                    .4,
                    3000,
                    8000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_5_2,
                    230,
                    521,
                    .415,
                    3000,
                    8000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_5_3,
                    459,
                    503,
                    .43,
                    3000,
                    8000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_5_4,
                    319,
                    360,
                    .45,
                    3000,
                    8000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_4_1,
                    123,
                    150,
                    .6,
                    2000,
                    6000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_4_2,
                    240,
                    140,
                    .63,
                    2000,
                    6000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_4_3,
                    230,
                    225,
                    .66,
                    2000,
                    6000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_4_4,
                    138,
                    84,
                    .69,
                    2000,
                    6000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_4_5,
                    180,
                    138,
                    .72,
                    2000,
                    6000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_3_1,
                    728,
                    800,
                    .85,
                    728 / .88),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_2_1,
                    1920,
                    230,
                    1),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_1_1,
                    963,
                    313,
                    -.5,
                    1000,
                    9000),
                new LayerSpawner(
                    Sprites.BIOME_VILLAGE_1_2,
                    895,
                    353,
                    -.6,
                    1000,
                    9000),
            ],
            new Catalogue(
                [

                ],
                [

                ]
            ));
    }
}