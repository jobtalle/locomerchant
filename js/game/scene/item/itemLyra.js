import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemLyra extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.LYRA, 111, 149, 0, 0, "rectangle");
    }
}