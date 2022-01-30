import {Scenery} from "./scenery.js";
import {Sprites} from "../../sprite/sprites.js";
import {LayerSpawner} from "./layer/layerSpawner.js";
import {Catalogue} from "./catalogue/catalogue.js";
import {ForSale} from "./catalogue/forSale.js";
import {ItemBall} from "../item/itemBall.js";
import {ItemCandy} from "../item/itemCandy.js";
import {ItemLightbulb} from "../item/itemLightbulb.js";
import {ItemBook} from "../item/itemBook.js";
import {ItemLyra} from "../item/itemLyra.js";
import {Buying} from "./catalogue/buying.js";
import {ItemBread} from "../item/itemBread.js";
import {ItemBaguette} from "../item/ItemBaguette.js";
import {ItemWoodenToy} from "../item/itemWoodenToy.js";
import {ItemBricks} from "../item/itemBricks.js";
import {ItemCandyStick} from "../item/itemCandyStick.js";

export class SceneryClouds extends Scenery {
    constructor(width, height, length) {
        super(
            width,
            height,
            length,
            Sprites.BIOME_CLOUDS_7_1,
            [
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_6_1,
                    1184,
                    996,
                    .1,
                    5000,
                    25000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_6_2,
                    1258,
                    1066,
                    .15,
                    5000,
                    25000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_5_1,
                    1920,
                    428,
                    .2,
                    1820 / .2),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_4_1,
                    1920,
                    332,
                    .25,
                    1520 / .2),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_3_1,
                    327,
                    80,
                    .35,
                    1000,
                    7000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_3_2,
                    263,
                    182,
                    .36,
                    1000,
                    7000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_3_3,
                    347,
                    113,
                    .37,
                    1000,
                    6000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_3_4,
                    361,
                    117,
                    .38,
                    1000,
                    6000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_3_5,
                    264,
                    199,
                    .39,
                    1000,
                    5000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_3_6,
                    275,
                    175,
                    .4,
                    1000,
                    5000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_3_7,
                    291,
                    159,
                    .41,
                    1000,
                    5000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_2_1,
                    1920,
                    230,
                    1),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_1_1,
                    491,
                    234,
                    -.3,
                    1000,
                    3000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_1_2,
                    599,
                    186,
                    -.34,
                    1000,
                    3000),
                new LayerSpawner(
                    Sprites.BIOME_CLOUDS_1_3,
                    42,
                    203,
                    -.38,
                    1000,
                    3000),
            ],
            new Catalogue(
                [
                    new ForSale(ItemBall, 10, 0, 3),
                    new ForSale(ItemCandy, 10, 0, 3),
                    new ForSale(ItemLightbulb, 10, 0, 2),
                    new ForSale(ItemBook, 20, 0, 4),
                    new ForSale(ItemCandyStick, 15, 0, 3),
                    new ForSale(ItemLyra, 50,0, 2)
                ],
                [
                    new Buying(ItemBread, 25),
                    new Buying(ItemBaguette, 25),
                    new Buying(ItemWoodenToy, 300),
                    new Buying(ItemBricks, 40)
                ]
            ));
    }
}