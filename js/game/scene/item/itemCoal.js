import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemCoal extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.COAL, 56, 56, 40, 1.5, "circle");
    }
}