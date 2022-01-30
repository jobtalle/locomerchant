import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemBread extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.BREAD, 205, 95, 0, 0, "rectangle");
    }
}