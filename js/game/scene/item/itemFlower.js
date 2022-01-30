import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemFlower extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.FLOWER, 86, 161, 0, 0, "rectangle");
    }
}