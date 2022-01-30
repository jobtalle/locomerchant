import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemBaguette extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.BAGUETTE, 500, 50, 0, 0, "rectangle");
    }
}