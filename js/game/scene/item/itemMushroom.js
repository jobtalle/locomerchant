import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemMushroom extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.MUSHROOM, 67, 70, 0, 0, "circle");
    }
}