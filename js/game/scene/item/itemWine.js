import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemWine extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.WINE, 49, 85, 0, 0, "rectangle");
    }
}