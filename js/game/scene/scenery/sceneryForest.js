import {Scenery} from "./scenery.js";
import {LayerSpawner} from "./layer/layerSpawner.js";
import {Sprites} from "../../sprite/sprites.js";
import {Catalogue} from "./catalogue/catalogue.js";
import {ForSale} from "./catalogue/forSale.js";
import {ItemLog} from "../item/itemLog.js";
import {ItemCoal} from "../item/itemCoal.js";
import {Buying} from "./catalogue/buying.js";
import {ItemTwig} from "../item/itemTwig.js";
import {Sounds} from "../../audio/sounds.js";
import {ItemBlueberries} from "../item/itemBlueberries.js";
import {ItemFlower} from "../item/itemFlower.js";
import {ItemPumpkin} from "../item/itemPumpkin.js";
import {ItemMushroom} from "../item/itemMushroom.js";
import {ItemBread} from "../item/itemBread.js";
import {ItemBricks} from "../item/itemBricks.js";
import {ItemBaguette} from "../item/ItemBaguette.js";

export class SceneryForest extends Scenery {
    constructor(width, height, length) {
        super(
            width,
            height,
            length,
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
        ],
        new Catalogue(
            [
                new ForSale(ItemTwig, 5, 2, 3),
                new ForSale(ItemLog, 10, 5, 15),
                new ForSale(ItemCoal, 20, 3, 6),
                new ForSale(ItemBlueberries, 10, 0, 2),
                new ForSale(ItemFlower, 10, 0, 3),
                new ForSale(ItemPumpkin, 15, 0, 3),
                new ForSale(ItemMushroom, 5, 0, 4)
            ],
            [
                new Buying(ItemLog, 5),
                new Buying(ItemCoal, 20),
                new Buying(ItemBricks, 50),
                new Buying(ItemBread, 20),
                new Buying(ItemBaguette, 20),
                new Buying(ItemBricks, 40)
            ]
        ),
        Sounds.AMB_FOREST);
    }
}