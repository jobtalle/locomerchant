import {Item} from "./item.js";
import {Sprites} from "../../sprite/sprites.js";

export class ItemLog extends Item {
    constructor(engine, position) {
        super(engine, position, Sprites.LOG, 33, 88, 15, 1, "rectangle");
    }
}