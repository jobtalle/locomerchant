import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemWoodenToy extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.WOODEN_TOY, 186, 148, 0, 0, "rectangle");
    }
}