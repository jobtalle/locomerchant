import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemHaystack extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.HAYSTACK, 163, 113, 0, 0, "rectangle");
    }
}