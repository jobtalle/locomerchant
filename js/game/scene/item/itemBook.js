import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemBook extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.BOOK, 82, 99, 0, 0, "rectangle");
    }
}