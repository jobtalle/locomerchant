import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemBlueberries extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.BLUEBERRIES, 58, 63, 0, 0, "circle");
    }
}