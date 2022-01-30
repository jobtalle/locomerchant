import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemMilk extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.MILK, 50, 79, 0, 0, "rectangle");
    }
}