import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemBaguette extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.BAGUETTE, 250, 25, 0, 0, "rectangle");
    }
}