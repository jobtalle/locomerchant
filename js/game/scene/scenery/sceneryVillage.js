import {Scenery} from "./scenery.js";
import {Sprites} from "../../sprite/sprites.js";
import {Catalogue} from "./catalogue/catalogue.js";
import {LayerSpawner} from "./layer/layerSpawner.js";
import {Sounds} from "../../audio/sounds.js";
import {Buying} from "./catalogue/buying.js";
import {ItemTwig} from "../item/itemTwig.js";
import {ItemLog} from "../item/itemLog.js";
import {ItemCoal} from "../item/itemCoal.js";
import {ForSale} from "./catalogue/forSale.js";
import {ItemWoodenToy} from "../item/itemWoodenToy.js";
import {ItemBaguette} from "../item/ItemBaguette.js";
import {ItemBricks} from "../item/itemBricks.js";
import {ItemBread} from "../item/itemBread.js";
import {ItemBlueberries} from "../item/itemBlueberries.js";
import {ItemFlower} from "../item/itemFlower.js";
import {ItemPumpkin} from "../item/itemPumpkin.js";
import {ItemMushroom} from "../item/itemMushroom.js";
import {ItemHaystack} from "../item/itemHaystack.js";
import {ItemMilk} from "../item/itemMilk.js";
import {ItemWatermelon} from "../item/itemWatermelon.js";
import {ItemWine} from "../item/itemWine.js";

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
                    new ForSale(ItemWoodenToy, 100, 0, 2),
                    new ForSale(ItemBaguette, 10, 1, 6),
                    new ForSale(ItemBricks, 20, 2, 4),
                    new ForSale(ItemBread, 10, 1, 6)
                ],
                [
                    new Buying(ItemTwig, 7),
                    new Buying(ItemLog, 20),
                    new Buying(ItemCoal, 35),
                    new Buying(ItemBlueberries, 30),
                    new Buying(ItemFlower, 20),
                    new Buying(ItemPumpkin, 30),
                    new Buying(ItemMushroom, 10),
                    new Buying(ItemHaystack, 10),
                    new Buying(ItemMilk, 20),
                    new Buying(ItemWine, 35),
                    new Buying(ItemWatermelon, 12)
                ]
            ),
            Sounds.AMB_VILLAGE);
    }
}